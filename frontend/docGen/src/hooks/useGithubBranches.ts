import { useState, useEffect } from 'react';
import { fetchGitHubBranches, parseGitHubUrl, GitHubBranch, GitHubRepoInfo } from '../utils/githubUtils'

interface UseGitHubBranchesReturn {
  branches: GitHubBranch[];
  isLoading: boolean;
  error: string | null;
  repoInfo: GitHubRepoInfo;
  refetch: () => void;
}

export const useGitHubBranches = (repoUrl: string): UseGitHubBranchesReturn => {
  const [branches, setBranches] = useState<GitHubBranch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repoInfo, setRepoInfo] = useState<GitHubRepoInfo>({ owner: '', repo: '', isValid: false });

  const fetchBranches = async (owner: string, repo: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedBranches = await fetchGitHubBranches(owner, repo);
      setBranches(fetchedBranches);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch branches';
      setError(errorMessage);
      setBranches([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const parsedInfo = parseGitHubUrl(repoUrl);
    setRepoInfo(parsedInfo);

    if (parsedInfo.isValid && parsedInfo.owner && parsedInfo.repo) {
      fetchBranches(parsedInfo.owner, parsedInfo.repo);
    } else {
      setBranches([]);
      setError(null);
      setIsLoading(false);
    }
  }, [repoUrl]);

  const refetch = () => {
    if (repoInfo.isValid && repoInfo.owner && repoInfo.repo) {
      fetchBranches(repoInfo.owner, repoInfo.repo);
    }
  };

  return {
    branches,
    isLoading,
    error,
    repoInfo,
    refetch
  };
};