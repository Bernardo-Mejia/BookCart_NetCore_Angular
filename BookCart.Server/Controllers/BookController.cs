using BookCart.Server.Context;
using BookCart.Server.Models;
using BookCart.Server.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookCart.Server.Controllers
{
    [EnableCors("CorsReglas")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        [Route("GetCategoriesList")]
        public async Task<IEnumerable<Category>> CategoriesList()
        {
            return await Task.FromResult(_bookService.GetCategories());
        }

        [HttpGet("{idBook}")]
        public async Task<IActionResult> GetBookDetail(int idBook)
        {
            Book book = await Task.FromResult(_bookService.GetBookData(idBook));
            if(book != null)
            {
                return Ok(book);
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return await Task.FromResult(this._bookService.GetAllBooks());
        }

        [HttpGet]
        [Route("GetBookDetails/{idBook}")]
        public async Task<Book> GetBookDetails(int idBook)
        {
            return await Task.FromResult(_bookService.GetBookData(idBook));
        }
    }
}
