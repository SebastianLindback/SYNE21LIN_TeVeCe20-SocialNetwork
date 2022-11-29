using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity.Specifications;

namespace Infrastructure.Interfaces;

public interface IGenericRepository<T>
{
    Task<IReadOnlyList<T>> ListAllAsync();

    Task<T> GetByIdAsync(dynamic id);

    Task<IReadOnlyList<T>> ListWithSpec(ISpecification<T> spec);

    Task<T> GetEntityWithSpec(ISpecification<T> spec);
} 
