import axios from 'axios';
import { injectable } from 'tsyringe';
import dotenv from 'dotenv';

dotenv.config(); 

const GITHUB_TOKEN = process.env.GITVIEW_TOKEN;
const GITHUB_BASE_URL = process.env.GITHUB_BASE_URL
if (!GITHUB_TOKEN) {
  throw new Error('🚨 GITVIEW_TOKEN is not set in the environment variables.');
}

const githubAxios = axios.create({
  baseURL: GITHUB_BASE_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    'User-Agent': 'GitView-App',
  },
});

@injectable()
export class UserGitHubService {
  async fetchUser(username: string) {
    const response = await githubAxios.get(`/users/${username}`);
    return response.data;
  }

  async fetchFollowers(username: string): Promise<string[]> {
    try {
      const response = await githubAxios.get(`/users/${username}/followers`);
      return response.data.map((follower: any) => follower.login);
    } catch (error) {
      console.error('Error fetching followers:', error);
      return [];
    }
  }

  async fetchFollowersDetails(username: string): Promise<any[]> {
    try {
      const response = await githubAxios.get(`/users/${username}/followers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching followers details:', error);
      return [];
    }
  }

  async fetchFollowing(username: string): Promise<string[]> {
    try {
      const response = await githubAxios.get(`/users/${username}/following`);
      return response.data.map((following: any) => following.login);
    } catch (error) {
      console.error('Error fetching following:', error);
      return [];
    }
  }


  async fetchUserRepos(username: string): Promise<any[]> {
    const response = await githubAxios.get(`/users/${username}/repos`);
    return response.data;
  }

  async fetchRepoDetails(username: string, repoName: string): Promise<any> {
    const response = await githubAxios.get(`/repos/${username}/${repoName}`);
    return response.data;
  }
}
