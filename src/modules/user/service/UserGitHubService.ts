import axios from 'axios';
import { injectable } from 'tsyringe';

@injectable()
export class UserGitHubService {
  async fetchUser(username: string) {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  }

  async fetchFollowers(username: string): Promise<string[]> {
    const response = await axios.get(`https://api.github.com/users/${username}/followers`);
    return response.data.map((u: any) => u.login);
  }
  
  async fetchFollowing(username: string): Promise<string[]> {
    const response = await axios.get(`https://api.github.com/users/${username}/following`);
    return response.data.map((u: any) => u.login);
  }
  
}
