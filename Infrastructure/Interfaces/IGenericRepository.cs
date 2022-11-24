using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces;

public interface IGenericRepository<T>
{
    Task<IReadOnlyList<T>> ListAllAsync();

    Task<T> GetByIdAsync(dynamic id);
} 
