using NHibernate;

using jsolo.simpleinventory.core.entities;
// using jsolo.simpleinventory.core.objects;
using jsolo.simpleinventory.impl.identity;
using jsolo.simpleinventory.impl.objects;
using jsolo.simpleinventory.sys.common.interfaces;
using jsolo.simpleinventory.core.objects;



namespace jsolo.simpleinventory.impl.persistance;



/// <summary>
/// 
/// </summary>
public class DatabaseContext : IDatabaseContext
{
    #region private & internal variables
    readonly ICurrentUserService usrSvc;

    readonly IDateTimeService dateSvc;

    internal readonly NHibernate.ISession session;

    private ITransaction? transaction;

    /// <param name="session"></param>
    /// <param name="currentUserService"></param>
    /// <param name="dateTimeService"></param>
    public DatabaseContext(
        ISession session,
        ICurrentUserService currentUserService,
        IDateTimeService dateTimeService
)
    {
        usrSvc = currentUserService;
        dateSvc = dateTimeService;
        this.session = session;
    }
    #endregion


    public ICurrentUserService CurrentUser => usrSvc;

    public IDateTimeService DateTime => dateSvc;



    #region datasets
    /// <summary>
    /// 
    /// </summary>
    public IQueryable<InventoryTransaction> InventoryTransactions => this.session.Query<InventoryTransaction>();

    /// <summary>
    /// 
    /// </summary>
    public IQueryable<Inventory> Inventories => this.session.Query<Inventory>();

    /// <summary>
    /// 
    /// </summary>
    public IQueryable<Product> Products => this.session.Query<Product>();


    /// <summary>
    /// 
    /// </summary>
    public IQueryable<Vendor> Vendors => this.session.Query<Vendor>();

    /// <summary>
    /// 
    /// </summary>
    public IQueryable<ProductType> ProductTypes => this.session.Query<ProductType>();

    /// <summary>
    /// 
    /// </summary>
    public IQueryable<Currency> Currencies => this.session.Query<Currency>();

    // public IQueryable<Customer> Customers => this.session.Query<Customer>();
    #endregion


    public virtual IDatabaseContext Add<TEntity>(TEntity entity)
    {
        session.Save(entity);
        return this;
    }


    public virtual async Task<IDatabaseContext> AddAsync<TEntity>(TEntity entity, CancellationToken cancellationToken = new CancellationToken())
    {
        await session.SaveAsync(entity, cancellationToken);
        return this;
    }


    public virtual IDatabaseContext Update<TEntity>(TEntity entity)
    {
        session.Update(entity);
        return this;
    }


    public virtual async Task<IDatabaseContext> UpdateAsync<TEntity>(TEntity entity, CancellationToken cancellationToken = new CancellationToken())
    {
        await session.UpdateAsync(entity, cancellationToken);
        return this;
    }


    public virtual IDatabaseContext Delete<TEntity>(TEntity entity)
    {
        session.Delete(entity);
        return this;
    }


    public virtual async Task<IDatabaseContext> DeleteAsync<TEntity>(
        TEntity entity,
        CancellationToken cancellationToken = new CancellationToken()
    )
    {
        await session.DeleteAsync(entity, cancellationToken);
        return this;
    }


    public virtual IDatabaseContext BeginTransaction()
    {
        transaction = session.BeginTransaction();
        return this;
    }


    public IDatabaseContext SaveChanges()
    {
        if (transaction is not null)
        {
            transaction.Commit();
        }
        return this;
    }


    public async Task<IDatabaseContext> SaveChangesAsync()
    {
        if (transaction is not null)
        {
            await transaction.CommitAsync();
        }
        return this;
    }


    public IDatabaseContext RollbackChanges()
    {
        if (transaction is not null)
        {
            transaction.Rollback();
        }
        return this;
    }

    public async Task<IDatabaseContext> RollbackChangesAsync()
    {
        if (transaction is not null)
        {
            await transaction.RollbackAsync();
        }

        return this;
    }


    public IDatabaseContext CloseTransaction()
    {
        transaction?.Dispose();
        return this;
    }


    public virtual void Dispose()
    {
        if (this.transaction != null)
        {
            // this.transaction.Rollback();
            this.transaction.Dispose();
            // this.transaction = null;
        }

        if (this.session?.IsOpen == true)
        {
            this.session.Close();
            this.session.Dispose();
        }
    }
}


/// <summary>
/// 
/// </summary>
public class IdentityDatabaseContext : DatabaseContext, IIdentityDatabaseContext
{
    /// <summary>
    /// 
    /// </summary>
    public IQueryable<User> Users => this.session.Query<User>();

    /// <summary>
    /// 
    /// </summary>
    public IQueryable<UserRole> Roles => this.session.Query<UserRole>();

    /// <summary>
    /// 
    /// </summary>
    public IQueryable<UserPermission> Permissions => this.session.Query<UserPermission>();

    /// <summary>
    /// 
    /// </summary>
    public IQueryable<RefreshToken> RefreshTokens => this.session.Query<RefreshToken>();

    /// <param name="session"></param>
    /// <param name="currentUserService"></param>
    /// <param name="dateTimeService"></param>
    public IdentityDatabaseContext(
        NHibernate.ISession session,
        ICurrentUserService currentUserService,
        IDateTimeService dateTimeService
    ) : base(session, currentUserService, dateTimeService) { }
}
