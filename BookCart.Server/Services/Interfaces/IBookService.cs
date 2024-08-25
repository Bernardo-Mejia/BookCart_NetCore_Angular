using BookCart.Server.Dto;
using BookCart.Server.Models;

namespace BookCart.Server.Services.Interfaces
{
    public interface IBookService
    {
        List<Book> GetAllBooks();
        int AddBook(Book book);
        int UpdateBook(Book book);
        Book GetBookData(int bookId);
        string DeleteBook(int bookId);
        List<Category> GetCategories();
        List<Book> GetSimilarBooks(int bookId);
        List<Book> GetBooksAvailableInWishlist(string wishlistID);
        List<CartItemDto> GetBooksAvailableInCart(string cartID);
    }
}
