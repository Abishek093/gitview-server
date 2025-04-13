export interface IFriendProps {
    user: string;      
    friend: string;    
    mutual: boolean;  
  }
  
  export class FriendEntity {
    public readonly user: string;
    public readonly friend: string;
    public readonly mutual: boolean;
  
    constructor(props: IFriendProps) {
      this.user = props.user;
      this.friend = props.friend;
      this.mutual = props.mutual;
    }
  
    toObject(): IFriendProps {
      return { ...this };
    }
  }
  