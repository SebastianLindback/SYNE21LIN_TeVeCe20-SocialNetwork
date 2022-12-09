using SocialNetwork.Entity;
using SocialNetwork.Entity.Specification;

namespace Entity.Interfaces
{
    public interface IGenericRepository<T>
    {
        Task<IReadOnlyList<T>> ListAllAsync();

        Task<T> GetByIdAsync(dynamic id);

        Task<int> CreateAsync(T entity);
        Task<IReadOnlyList<T>> ListWithSpec(ISpecification<T> spec);

        Task<T> GetPropWithSpec(ISpecification<T> spec);
    }
}