using BookCart.Server.Context;
using BookCart.Server.Services.Interfaces;

namespace BookCart.Server.Services.DataAccess
{
    public class OrderService : IOrderService
    {
        readonly BookCartDBContext _dbContext;

        public OrderService(BookCartDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        int createRandomNumber(int length)
        {
            Random rnd = new();
            return rnd.Next(Convert.ToInt32(Math.Pow(10, length - 1)), Convert.ToInt32(Math.Pow(10, length)));
        }

    }
}
