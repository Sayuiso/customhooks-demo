import { useState } from "react";
import { userProfile } from "../types/userProfile";
import axios from "axios";
import { User } from "../types/api/user";

// 全ユーザーを取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<userProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false);
    //  User型が配列になって渡ってくるよ
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // 新しい配列を作って更新関数に入れる
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name} (${user.username})`,
          email: user.email,
          address: `${user.address.city} ${user.address.suite} ${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      //正常でもエラーでも行う操作
      .finally(() => {
        setLoading(false);
      });
  };
  // 呼び出し元にロジック関数と必要な状態変数を返す
  return { getUsers, userProfiles, loading, error };
};
