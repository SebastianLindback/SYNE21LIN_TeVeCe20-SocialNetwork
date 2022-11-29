using SocialNetwork.Entity.Specification;

namespace Entity.Interfaces
{
    public interface IGenericRepository<T>
    {
        Task<IReadOnlyList<T>> ListAllAsync();

        Task<T> GetByIdAsync(dynamic id);

        Task<T> CreateAsync(T entity);
    }
}