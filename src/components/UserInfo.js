import React from 'react'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export const UserInfo = (props) => {
  const { userId, userLabel, avatarURL } = props

  return (
    <div className='question-user-info'>
      <h3>{userLabel}</h3>
      <Link to={`/user/${userId}`}>
        <img
          src={avatarURL}
          className='avatar'
          alt=''
        />
      </Link>
    </div>
  )
}

UserInfo.propTypes = {
  userId: PropTypes.string,
  userLabel: PropTypes.string,
  avatarURL: PropTypes.string,
}

