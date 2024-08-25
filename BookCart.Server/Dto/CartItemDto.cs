using BookCart.Server.Models;

namespace BookCart.Server.Dto
{
    public class CartItemDto
    {
        public Book? Book { get; set; }
        public int Quantity { get; set; }
    }
}
