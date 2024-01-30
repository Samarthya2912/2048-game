import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { LoadingSpinner } from 'baseui/button/styled-components';
import { KIND, Toast } from 'baseui/toast';

const GET_LEADERBOARD = gql`
    {
        leaderboard {
            id
            username 
            max_score
        }
    }
`

function Leaderboard() {
    const { data, loading, error } = useQuery(GET_LEADERBOARD);

    console.log( data, loading, error )

    return (
        <div className='leaderboard'>
            <h2>Leaderboards</h2>
            {loading && <LoadingSpinner />}
            {error &&  <Toast kind={KIND.negative}>{error.message}</Toast>}
            {(!error && !loading) && <ul>
            {
                data.leaderboard.map((user: { id: string, username: string, max_score: number }) => {
                    return <li key={user.id}>{user.username} with a score of {user.max_score}</li>    
                })
            }
            </ul>}
        </div>
    )
}

export default Leaderboard