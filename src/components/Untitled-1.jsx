   <>
            <div className="user-list">
                {isLoading ? (
                    <div className="loader">Loading...</div>
                ) : users.length > 0 ? (
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} onClick={() => handleUserClick(user)}>
                                <img src={user?.avatar} alt="Profile" />
                                {user.profile.firstName}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No data to show</div>
                )}
            </div>
            <div className="user-details">
                {selectedUser ? (
                    <div>
                        <h2>{selectedUser.avatar}</h2>
                        <img src={selectedUser.Bio} alt="Profile" />
                        {/* Render additional details here */}
                    </div>
                ) : (
                    <div>Select a user</div>
                )}
            </div>
            </>