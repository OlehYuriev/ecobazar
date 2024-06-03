export default interface IComment {
  id: string;
  userId: string;
  username: string;
  photoUrl: string | null;
  comment: string;
  timestamp: number;
}
