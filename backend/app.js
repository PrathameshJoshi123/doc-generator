const express = require('express')
const cors = require('cors')
const axios = require('axios')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
console.log(GITHUB_CLIENT_ID)
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const REDIRECT_URI =
  process.env.REDIRECT_URI || 'http://localhost:3001/auth/github/callback'

const userTokens = new Map()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/auth/github', (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo`
  res.redirect(githubAuthUrl)
})

app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query

  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )

    const accessToken = tokenResponse.data.access_token

    if (!accessToken) {
      return res.status(400).json({ error: 'Failed to obtain access token' })
    }

    // Get user information
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
        'User-Agent': 'Document-Generator-App',
      },
    })

    const userId = userResponse.data.id
    const username = userResponse.data.login

    // Store token (use secure storage in production)
    userTokens.set(userId, {
      token: accessToken,
      username: username,
      userData: userResponse.data,
    })

    // Redirect to frontend with success
    res.redirect(`/?success=true&userId=${userId}&username=${username}`)
  } catch (error) {
    console.error('OAuth error:', error.response?.data || error.message)
    res.redirect('/?error=auth_failed')
  }
})

// Get user repositories
app.get('/api/repos/:userId', async (req, res) => {
  const { userId } = req.params
  const { page = 1, per_page = 30 } = req.query

  const userToken = userTokens.get(parseInt(userId))
  if (!userToken) {
    return res.status(401).json({ error: 'User not authenticated' })
  }

  try {
    const reposResponse = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${userToken.token}`,
        'User-Agent': 'Document-Generator-App',
      },
      params: {
        sort: 'updated',
        direction: 'desc',
        page: page,
        per_page: per_page,
      },
    })

    const repos = reposResponse.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      private: repo.private,
      html_url: repo.html_url,
      language: repo.language,
      updated_at: repo.updated_at,
      default_branch: repo.default_branch,
    }))

    res.json({ repos, user: userToken.userData })
  } catch (error) {
    console.error(
      'Error fetching repositories:',
      error.response?.data || error.message
    )
    res.status(500).json({ error: 'Failed to fetch repositories' })
  }
})

// Get repository contents
app.get('/api/repos/:userId/:owner/:repo/contents', async (req, res) => {
  const { userId, owner, repo } = req.params
  const { path: filePath = '' } = req.query

  const userToken = userTokens.get(parseInt(userId))
  if (!userToken) {
    return res.status(401).json({ error: 'User not authenticated' })
  }

  try {
    const contentsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `token ${userToken.token}`,
          'User-Agent': 'Document-Generator-App',
        },
      }
    )

    res.json(contentsResponse.data)
  } catch (error) {
    console.error(
      'Error fetching repository contents:',
      error.response?.data || error.message
    )
    res.status(500).json({ error: 'Failed to fetch repository contents' })
  }
})

// Get file content
app.get('/api/repos/:userId/:owner/:repo/file', async (req, res) => {
  const { userId, owner, repo } = req.params
  const { path: filePath } = req.query

  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' })
  }

  const userToken = userTokens.get(parseInt(userId))
  if (!userToken) {
    return res.status(401).json({ error: 'User not authenticated' })
  }

  try {
    const fileResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `token ${userToken.token}`,
          'User-Agent': 'Document-Generator-App',
        },
      }
    )

    // Decode base64 content
    const content = Buffer.from(fileResponse.data.content, 'base64').toString(
      'utf-8'
    )

    res.json({
      name: fileResponse.data.name,
      path: fileResponse.data.path,
      content: content,
      size: fileResponse.data.size,
      sha: fileResponse.data.sha,
    })
  } catch (error) {
    console.error(
      'Error fetching file content:',
      error.response?.data || error.message
    )
    res.status(500).json({ error: 'Failed to fetch file content' })
  }
})

// Logout endpoint
app.post('/api/logout/:userId', (req, res) => {
  const { userId } = req.params
  userTokens.delete(parseInt(userId))
  res.json({ message: 'Logged out successfully' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
