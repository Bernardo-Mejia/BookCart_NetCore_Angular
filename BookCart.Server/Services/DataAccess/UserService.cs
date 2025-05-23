﻿using BookCart.Server.Context;
using BookCart.Server.Models.Security;
using BookCart.Server.Services.Interfaces;

namespace BookCart.Server.Services.DataAccess
{
    public class UserService: IUserService
    {
        readonly BookCartDBContext _dbContext;

        public UserService(BookCartDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserMaster AuthenticateUser(UserMaster loginCredentials)
        {
            UserMaster user = new UserMaster();

            var userDetails = _dbContext.UserMaster.FirstOrDefault(
                u => u.Username == loginCredentials.Username && u.Password == loginCredentials.Password
                );

            if (userDetails != null)
            {

                user = new UserMaster
                {
                    Username = userDetails.Username,
                    UserId = userDetails.UserId,
                    UserTypeId = userDetails.UserTypeId
                };
                return user;
            }
            else
            {
                return userDetails;
            }
        }

        public int RegisterUser(UserMaster userData)
        {
            try
            {
                userData.UserTypeId = 2;
                _dbContext.UserMaster.Add(userData);
                _dbContext.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public bool CheckUserAvailabity(string userName)
        {
            string user = _dbContext.UserMaster.FirstOrDefault(x => x.Username == userName)?.ToString();

            if (user != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool isUserExists(int userId)
        {
            string user = _dbContext.UserMaster.FirstOrDefault(x => x.UserId == userId)?.ToString();

            if (user != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
