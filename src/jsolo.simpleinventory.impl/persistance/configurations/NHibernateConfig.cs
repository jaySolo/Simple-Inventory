using NHibernate.Cfg;

namespace jsolo.simpleinventory.impl.persistance.configurations
{
    public static class NHibernateConfig
    {
        private static NHibernate.Cfg.MappingSchema.HbmMapping DatabaseMapping
        {
            get
            {
                var mapper = new NHibernate.Mapping.ByCode.ModelMapper();

                mapper.AddMappings(System.Reflection.Assembly.GetExecutingAssembly().GetExportedTypes());

                return mapper.CompileMappingForAllExplicitlyAddedEntities();
            }
        }

        
        ///<summary>
        /// Generates a configuration for connections to a Microsoft
        /// SQL Server 2012 (or perhaps later) database.
        ///</summary>
        public static Configuration GenerateMsSqlConfiguration(string connStr)
        {
            Configuration cfg = new Configuration()
                .DataBaseIntegration(db => 
                {
                    db.ConnectionString = connStr;
                    db.Driver<NHibernate.Driver.SqlClientDriver>();
                    db.Dialect<NHibernate.Dialect.MsSql2012Dialect>();
                    db.LogFormattedSql = false;
                    db.LogSqlInConsole = false;
                });

            cfg.AddMapping(DatabaseMapping);
                
            return cfg;
        }

        
        ///<summary>
        /// Generates a configuration for connections to a MySQL
        /// Server database.
        ///</summary>
        public static Configuration GenerateMySqlConfiguration(string connStr)
        {
            Configuration cfg = new Configuration()
                .DataBaseIntegration(db => 
                {
                    db.ConnectionString = connStr;
                    db.Driver< NHibernate.Driver.MySqlDataDriver>();
                    db.Dialect<NHibernate.Dialect.MySQLDialect>();
                    // db.LogFormattedSql = true;
                    db.LogSqlInConsole = false;
                });

            cfg.AddMapping(DatabaseMapping);

            return cfg;
        }
        
        
        ///<summary>
        /// Generates a configuration for connections to a PostgreSQL
        /// Server database.
        ///</summary>
        public static Configuration GeneratePostgreSqlConfiguration(string connectionStr)
        {
            Configuration cfg = new Configuration()
                .DataBaseIntegration(db => {
                    db.ConnectionString = connectionStr;
                    db.Driver<NHibernate.Driver.NpgsqlDriver>();
                    db.Dialect<NHibernate.Dialect.PostgreSQLDialect>();
                    // db.LogFormattedSql = true;
                    db.LogSqlInConsole = false;
                });

            cfg.AddMapping(DatabaseMapping);

            return cfg;
        }
    }
}
