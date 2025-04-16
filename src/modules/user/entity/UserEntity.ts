export interface IUserProps {
  login: string;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  bio?: string;
  avatar_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  deleted?: boolean;
}

export class UserEntity {
  public login: string;
  public name?: string;
  public company?: string;
  public blog?: string;
  public location?: string;
  public bio?: string;
  public avatar_url: string;
  public public_repos: number;
  public public_gists: number;
  public followers: number;
  public following: number;
  public created_at: string;
  public updated_at: string;
  public deleted: boolean;

  constructor(props: IUserProps) {
    this.login = props.login;
    this.name = props.name || '';
    this.company = props.company || '';
    this.blog = props.blog || '';
    this.location = props.location || '';
    this.bio = props.bio || '';
    this.avatar_url = props.avatar_url;
    this.public_repos = props.public_repos;
    this.public_gists = props.public_gists;
    this.followers = props.followers;
    this.following = props.following;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
    this.deleted = props.deleted ?? false;

    this.validate();
  }

  private validate() {
    if (!this.login || typeof this.login !== 'string') {
      throw new Error('Invalid login (username)');
    }
    if (!this.avatar_url) {
      throw new Error('avatar_url is required');
    }
  }

  toObject(): IUserProps {
    return { ...this };
  }
}
