export interface IFriendProps {
    user: string;      
    friend: string;    
    mutual: boolean;  
    avatar_url?: string;
  }
  
  export class FriendEntity {
    public user: string;
    public friend: string;
    public mutual: boolean;
    public avatar_url?: string;
  
    constructor(props: IFriendProps) {
      this.user = props.user;
      this.friend = props.friend;
      this.mutual = props.mutual;
      this.avatar_url = props.avatar_url
    }
  
    toObject(): IFriendProps {
      return { ...this };
    }
  }
  