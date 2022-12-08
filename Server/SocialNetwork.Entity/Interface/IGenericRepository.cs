namespace SocialNetwork.Entity.Interface
{
    public interface IGenericRepository<T>
    {
        Task<IReadOnlyList<T>> ListAllAsync();

        Task<T> GetByIdAsync(dynamic id);

        Task<T> CreateAsync(T entity);
    }
}