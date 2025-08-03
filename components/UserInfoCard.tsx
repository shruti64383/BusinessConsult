export default function UserInfoCard({ user}: {user:any}){
    return(
        <div className="border p-4 rounderd-xl shadow bg-white">
            <h2 className="text-xl font-semibold"> User Info.</h2>
            <p><strong>Name:</strong>{user.name}</p>
            <p><strong>Email:</strong>{user.email}</p>
            <p><strong>ID:</strong>{user._id}</p>
        </div>
    )
}