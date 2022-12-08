using Microsoft.EntityFrameworkCore;
using SocialNetwork.Entity;
using SocialNetwork.Entity.Interface;

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

        public async Task<T> CreateAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}