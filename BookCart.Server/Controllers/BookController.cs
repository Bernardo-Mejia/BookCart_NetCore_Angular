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
    }
}
