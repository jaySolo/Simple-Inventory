using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using NHibernate;
using NHibernate.SqlTypes;
using NHibernate.UserTypes;


namespace jsolo.simpleinventory.impl.persistance.mappings;



public class JsonMappableType<T> : IUserType
{
    public object Assemble(object cached, object owner)
    {
        //Used for casching, as our object is immutable we can just return it as is
        return cached;
    }

    public object DeepCopy(object value)
    {
        //We deep copy the Translation by creating a new instance with the same contents
        if (value == null)
            return null;
        if (value.GetType() != typeof(T))
            return null;
        return FromJson(ToJson((T)value));
    }


    public object Disassemble(object value)
    {
        //Used for casching, as our object is immutable we can just return it as is
        return value;
    }


    public new bool Equals(object x, object y)
    {
        //Use json-query-string to see if their equal 
        // on value so we use this implementation
        if (x == null || y == null)
            return false;
        if (x.GetType() != typeof(T) || y.GetType() != typeof(T))
            return false;
        return ToJson((T)x).Equals(ToJson((T)y));
    }


    public int GetHashCode(object x)
    {
        if (x != null && x.GetType() == typeof(T))
            return ToJson((T)x).GetHashCode();
        return x.GetHashCode();
    }

    public bool IsMutable
    {
        get { return false; }
    }


    public object NullSafeGet(System.Data.Common.DbDataReader rs, string[] names, NHibernate.Engine.ISessionImplementor session, object owner)
    {
        //We get the string from the database using the NullSafeGet used to get strings 
        string jsonString = (string)NHibernateUtil.String.NullSafeGet(rs, names, session, owner);
        //And save it in the T object. This would be the place to make sure that your string 
        //is valid for use with the T class
        return FromJson(jsonString);
    }


    public void NullSafeSet(System.Data.Common.DbCommand cmd, object value, int index, NHibernate.Engine.ISessionImplementor session)
    {
        //Set the value using the NullSafeSet implementation for string from NHibernateUtil
        if (value == null)
        {
            NHibernateUtil.String.NullSafeSet(cmd, value, index, session);
            return;
        }
        value = ToJson((T)value);
        NHibernateUtil.String.NullSafeSet(cmd, value, index, session);
    }


    public object Replace(object original, object target, object owner)
    {
        //As our object is immutable we can just return the original
        return original;
    }

    public Type ReturnedType
    {
        get { return typeof(T); }
    }

    public SqlType[] SqlTypes
    {
        get
        {
            //We store our translation in a single column in the database that can contain a string
            SqlType[] types = new SqlType[1];
            types[0] = new SqlType(System.Data.DbType.String);
            return types;
        }
    }

    private static JsonSerializerSettings jsonSetting = new JsonSerializerSettings
    {
        ContractResolver = new OrderedContractResolver(),
        Formatting = Formatting.None,
        ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
        PreserveReferencesHandling = PreserveReferencesHandling.Objects,
        DefaultValueHandling = DefaultValueHandling.IgnoreAndPopulate

    };

    public static T FromJson(string jsonString)
    {
        if (!string.IsNullOrWhiteSpace(jsonString))
            return JsonConvert.DeserializeObject<T>(jsonString, jsonSetting);
        return Activator.CreateInstance<T>();
    }


    public static string ToJson(T obj)
    {
        return JsonConvert.SerializeObject(obj, jsonSetting);
    }

    
    /// <summary>
    /// Order the json-properties to create a simple equals case for JsonMappableType.Equals
    /// </summary>
    private class OrderedContractResolver : DefaultContractResolver
    {
        protected override System.Collections.Generic.IList<JsonProperty> CreateProperties(System.Type type, MemberSerialization memberSerialization)
        {
            return base.CreateProperties(type, memberSerialization).OrderBy(p => p.PropertyName).ToList();
        }
    }
}
