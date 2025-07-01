export interface GitHubRepoInfo {
    owner: string;
    repo: string;
    isValid: boolean;
  }
  
  export interface GitHubBranch {
    name: string;
    sha: string;
    protected: boolean;
  }
  
  /**
   * Parse a GitHub URL to extract owner and repository name
   */
  export const parseGitHubUrl = (url: string): GitHubRepoInfo => {
    if (!url) {
      return { owner: '', repo: '', isValid: false };
    }
  
    try {
      // Handle different GitHub URL formats
      const patterns = [
        // https://github.com/owner/repo
        /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?(?:\/.*)?$/,
        // git@github.com:owner/repo.git
        /^git@github\.com:([^\/]+)\/(.+?)(?:\.git)?$/,
        // github.com/owner/repo (without protocol)
        /^(?:www\.)?github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?(?:\/.*)?$/
      ];
  
      for (const pattern of patterns) {
        const match = url.trim().match(pattern);
        if (match) {
          const [, owner, repo] = match;
          if (owner && repo && owner !== '' && repo !== '') {
            return {
              owner: owner.trim(),
              repo: repo.trim(),
              isValid: true
            };
          }
        }
      }
  
      return { owner: '', repo: '', isValid: false };
    } catch (error) {
      console.error('Error parsing GitHub URL:', error);
      return { owner: '', repo: '', isValid: false };
    }
  };
  
  /**
   * Fetch branches for a GitHub repository
   */
  export const fetchGitHubBranches = async (owner: string, repo: string): Promise<GitHubBranch[]> => {
    if (!owner || !repo) {
      throw new Error('Owner and repository name are required');
    }
  
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Repository not found or is private');
        } else if (response.status === 403) {
          throw new Error('API rate limit exceeded or access forbidden');
        } else {
          throw new Error(`Failed to fetch branches: ${response.statusText}`);
        }
      }
  
      const branches: GitHubBranch[] = await response.json();
      return branches.map(branch => ({
        name: branch.name,
        sha: branch.sha || '',
        protected: branch.protected || false
      }));
    } catch (error) {
      console.error('Error fetching branches:', error);
      throw error;
    }
  };