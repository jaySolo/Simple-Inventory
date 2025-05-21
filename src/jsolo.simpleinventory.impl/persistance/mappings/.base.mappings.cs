using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;

using jsolo.simpleinventory.core.common;


namespace jsolo.simpleinventory.impl.persistance.mappings;



public class EntityMap<TEntity, TId> : ClassMapping<TEntity>
    where TEntity : Entity<TId>
    where TId : IEquatable<TId>
{
    public EntityMap(string tableName = nameof(TEntity))
    {
        Table(tableName);

        Id(e => e.Id, map =>
        {
            //  if(Common.IsGuidType(typeof(TId))) { map.Generator(Generators.GuidComb); }

            if (Common.IsStringType(typeof(TId)))
            {
                map.Length(128);
            }
        });

        Property(e => e.CreatedOn, map =>
        {
            map.Column("created_on");
            map.Type<NHibernate.Type.DateTimeType>();
        });

        Property(e => e.CreatorId, map => map.Column("creator_id"));

        Property(e => e.LastModifiedOn, map =>
        {
            map.Column("last_updated_on");
            map.NotNullable(false);
            map.Type<NHibernate.Type.DateTimeType>();
        });

        Property(e => e.LastModifierId, map => map.Column("last_updater_id"));
    }
}



public class ValueObjectMap<TValObj> : ClassMapping<TValObj> where TValObj : ValueObject
{
    public ValueObjectMap(string tableName = nameof(TValObj))
    {
        Table(tableName);
    }
}



public class ValueObjectMap<TValObj, TValue> : ClassMapping<TValObj>
    where TValObj : ValueObject<TValue>
    where TValue : IEquatable<TValue>
{
    public ValueObjectMap(string tableName = nameof(TValObj), Action<IIdMapper> idMapper = null)
    {
        Table(tableName);

        if (idMapper == null)
        {
            Id(obj => obj.Value, map => { map.Length(100); map.Column("Name"); });
        }
        else
        {
            Id(obj => obj.Value, idMapper);
        }
    }
}
