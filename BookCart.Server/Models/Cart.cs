namespace BookCart.Server.Models
{
    public class Cart
    {
        public string CartId { get; set; }
        public int UserId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
