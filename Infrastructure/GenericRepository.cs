using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity.Specifications;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly SocialNetworkContext _context;
        public GenericRepository(SocialNetworkContext context)
        {
            _context = context;
        }
        public async Task<T> GetByIdAsync(dynamic id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            var result = await ApplySpec(spec).FirstOrDefaultAsync();
            if (result == null) throw new NullReferenceException();
            return result;
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();

        }

        public async Task<IReadOnlyList<T>> ListWithSpec(ISpecification<T> spec)
        {
            return await ApplySpec(spec).ToListAsync();
        }

        private IQueryable<T> ApplySpec(ISpecification<T> spec){
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }
    }
}