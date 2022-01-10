import { usersData } from "../../fakeUsers/data";


export function getAvatarUrlByUserId(id: string): string | undefined {
    const user = usersData.find(user => user.id === id);

    if(user) {
        return user.avatarUrl;
    }
}