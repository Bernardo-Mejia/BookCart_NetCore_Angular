namespace BookCart.Server.Models
{
    public class Wishlist
    {
        public string WishlistId { get; set; }
        public int UserId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
