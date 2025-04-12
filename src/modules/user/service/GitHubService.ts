import axios from 'axios';
import { injectable } from 'tsyringe';

@injectable()
export class GitHubService {
  async fetchUser(username: string) {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  }
}
