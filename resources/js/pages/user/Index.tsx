import type {User} from '@/types';

interface UserProps {
    users: User[]
}

export default function Index ( users: UserProps ) {
    return (
        <>
            <h1>Users</h1>

            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </>
    )
}