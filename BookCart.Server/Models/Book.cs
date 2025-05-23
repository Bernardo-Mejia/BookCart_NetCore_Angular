﻿using System.ComponentModel.DataAnnotations;

namespace BookCart.Server.Models
{
    public class Book
    {
        public int BookId { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public string Category { get; set; }

        public decimal Price { get; set; }

        public string CoverFileName { get; set; }
    }
}
