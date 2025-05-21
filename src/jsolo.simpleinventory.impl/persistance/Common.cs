using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jsolo.simpleinventory.impl.persistance
{
    public static class Common
    {
        
        private static HashSet<TypeCode> IncrementatableTypes = new HashSet<TypeCode>
        {
            TypeCode.Byte,
            TypeCode.Int16,
            TypeCode.Int32,
            TypeCode.Int64,
            TypeCode.UInt16,
            TypeCode.UInt32,
            TypeCode.UInt64,
        };

        public static bool IsIncrementatableType(Type t)
            => IncrementatableTypes.Contains(Type.GetTypeCode(t));

        public static bool IsGuidType(Type t) => typeof(Guid) == t;

        public static bool IsStringType(Type t) => typeof(string) == t || typeof(String) == t;
    }
}