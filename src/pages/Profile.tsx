import { Heading } from "@components/common";
import { useAppSelector } from "@store/hooks";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <Heading>Профиль</Heading>
      <ul>
        <li>Имя: {user?.firstName}</li>
        <li>Фамилия: {user?.lastName}</li>
        <li>Электронная почта: {user?.email}</li>
      </ul>
    </>
  );
};

export default Profile;
