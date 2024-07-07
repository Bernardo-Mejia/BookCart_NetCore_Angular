using BookCart.Server.Models.Security;

namespace BookCart.Server.Services.Interfaces
{
    public interface IUserService
    {
        UserMaster AuthenticateUser(UserMaster loginCredentials);
        int RegisterUser(UserMaster userData);
        bool CheckUserAvailabity(string userName);

        bool isUserExists(int userId);
    }
}
