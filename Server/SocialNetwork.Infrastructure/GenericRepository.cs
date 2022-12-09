using Entity.Interfaces;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Entity;
using SocialNetwork.Entity.Specification;

namespace SocialNetwork.Infrastructure
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
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

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<int> CreateAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            var result = await _context.SaveChangesAsync();
            return result;
        }
        public async Task<IReadOnlyList<T>> ListWithSpec(ISpecification<T> spec)
        {
            return await ApplySpec(spec).ToListAsync();
        }
        public async Task<T> GetPropWithSpec(ISpecification<T> spec)
        {
            var result = await ApplySpec(spec).ToListAsync();
            return result.FirstOrDefault();
        }
        private IQueryable<T> ApplySpec(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }
    }
}