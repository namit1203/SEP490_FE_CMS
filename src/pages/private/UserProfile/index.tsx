import { useQueryUserProfile } from "../../../queries/user-profile";

const UserProfilePage: React.FC = () => {
  const { data } = useQueryUserProfile()
  console.log(data);

  
  return <>User Profile Page</>
}
export default UserProfilePage
