using jsolo.simpleinventory.sys.common;

using NHibernate;
using NHibernate.Cfg;


namespace jsolo.simpleinventory.impl.persistance;



/// <summary>
/// Encapulates the automated database migration method(s).
/// </summary>
public static class DatabaseMigrator
{
    /// <summary>
    /// Ensures that the database is created and up to date with the application's database
    /// schema definitions based on the supplied configuration.
    /// </summary>
    /// <param name="cfg">
    /// The configuration that contains the database connection parameters.
    /// </param>
    /// <returns>
    /// A <see cref="DataOperationResult"/> that indicates whether or not the database schema
    /// is already up to date and/or the database migration was successfully completed. This
    /// may be <see cref="DataOperationResult.Exists" /> if the database schema is already up
    /// to date, <see cref="DataOperationResult.Success" /> if the database schema was created
    /// from stratch, or <see cref="DataOperationResult.SomeChangesNotSaved"/> if the database
    /// schema was updated.
    /// </returns>
    public static Task<DataOperationResult> EnsureDatabaseCreatedAsync(Configuration cfg)
    {
        try
        {
            new NHibernate.Tool.hbm2ddl.SchemaValidator(cfg).Validate();

            return Task.FromResult(DataOperationResult.Exists);
        }
        catch (SchemaValidationException ex)
        {
            var missingTablesCount = ex.ValidationErrors
                .Count(vex => vex.ToLower().Contains("missing table"));
            var schemaTablesCount = cfg.ClassMappings.Count();

            if (missingTablesCount == schemaTablesCount)
            {
                new NHibernate.Tool.hbm2ddl.SchemaExport(cfg).Execute(true, true, false);

                return Task.FromResult(DataOperationResult.Success);
            }
            else
            {
                new NHibernate.Tool.hbm2ddl.SchemaUpdate(cfg).Execute(true, true);

                return Task.FromResult(DataOperationResult.SomeChangesNotSaved);
            }
        }
        catch (Exception ex)
        {
            return Task.FromResult(DataOperationResult.Failure(
                ex.Message,
                ex.InnerException?.ToString() ?? ""
            ));
        }
    }
}
