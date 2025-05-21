using Microsoft.AspNetCore.Identity;
using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;

using jsolo.simpleinventory.impl.identity;
using jsolo.simpleinventory.impl.objects;
using jsolo.simpleinventory.core.common;


namespace jsolo.simpleinventory.impl.persistance.mappings;



public class RefreshTokenMap : ClassMapping<RefreshToken>
{
    public RefreshTokenMap()
    {
        Table("users_tokens");

        Id(usr => usr.Token, map =>
        {
            map.Column("token");
            // map.NotNullable(true);
        });

        OneToOne(usr => usr.User, map =>
        {
            map.Cascade(Cascade.None);
            map.Constrained(false);
            map.ForeignKey("user_id");
            // map.NotNullable(true);
        });

        Property(usr => usr.JwtId, map =>
        {
            map.NotNullable(false);
            map.Column("jwt_id");
            // map.NotNullable(true);
        });

        Property(usr => usr.CreationDate, map =>
        {
            map.Column("created_on");
            map.Type<NHibernate.Type.DateTimeType>();
            // map.NotNullable(true);
        });

        Property(usr => usr.ExpiryDate, map =>
        {
            map.Column("expires_on");
            map.NotNullable(false);
            map.Type<NHibernate.Type.DateTimeType>();
        });

        Property(usr => usr.Used, map =>
        {
            map.Column("is_used");
            map.NotNullable(false);
        });

    }
}


public class UserMap : ClassMapping<User>
{
    public UserMap()
    {
        Table("users");

        Id(usr => usr.Id);

        Property(usr => usr.UserName, map =>
        {
            map.Column("username");
            map.Length(256);
            map.Unique(true);
            map.NotNullable(true);
        });
        Property(usr => usr.NormalizedUserName, map =>
        {
            map.Column("username_normalized");
            map.Length(256);
            map.NotNullable(false);
        });

        Property(usr => usr.Email, map =>
        {
            map.Column("email");
            map.Length(256);
            map.NotNullable(false);
        });
        Property(usr => usr.EmailConfirmed, map =>
        {
            map.Column("email_confirmed");
            map.NotNullable(false);
        });
        Property(usr => usr.NormalizedEmail, map =>
        {
            map.Column("email_normalized");
            map.Length(256);
        });

        Property(usr => usr.PhoneNumber, map =>
        {
            map.Column("phone");
            map.Length(25);
            map.NotNullable(false);
        });
        Property(usr => usr.PhoneNumberConfirmed, map =>
        {
            map.Column("phone_confirmed");
            map.NotNullable(false);
        });

        Property(usr => usr.Surname, map =>
        {
            map.Column("surname");
        });
        Property(usr => usr.FirstName, map =>
        {
            map.Column("firstnames");
        });

        Property(usr => usr.Birthdate, map =>
        {
            map.Column("birthday");
            map.NotNullable(false);
            map.Type<NHibernate.Type.DateTimeType>();
        });

        Property(usr => usr.Position, map =>
        {
            map.Column("position");
            map.Length(150);
            map.NotNullable(false);
        });

        Property(usr => usr.AccessFailedCount, map =>
        {
            map.Column("failed_access_count");
            map.NotNullable(false);
        });

        Property(usr => usr.ConcurrencyStamp, map =>
        {
            map.Column("stamp_concurrency");
            map.NotNullable(false);
        });

        Property(usr => usr.SecurityStamp, map =>
        {
            map.Column("stamp_security");
            map.NotNullable(false);
        });

        Property(usr => usr.LockoutEnabled, map =>
        {
            map.Column("lockable");
            map.NotNullable(false);
        });

        Property(usr => usr.LockoutEnd, map =>
        {
            map.Column("lock_until");
            map.NotNullable(false);
            map.Type<NHibernate.Type.DateTimeType>();
        });

        Property(usr => usr.PasswordHash, map =>
        {
            map.Column("pwrd_hash");
            map.NotNullable(false);
        });

        Property(usr => usr.TwoFactorEnabled, map =>
        {
            map.Column("use_2fa_login");
        });

        Property(usr => usr.FileName, map =>
        {
            map.Column("avatar_file_name");
            map.Length(4000);
            map.NotNullable(false);
        });
        Property(usr => usr.FileExtension, map =>
        {
            map.Column("avatar_file_ext");
            map.Length(4000);
            map.NotNullable(false);
        });
        Property(usr => usr.FileContentType, map =>
        {
            map.Column("avatar_file_type");
            map.Length(4000);
            map.NotNullable(false);
        });
        Property(usr => usr.FileUploadDate, map =>
        {
            map.Column("avatar_uploaded_on");
            map.NotNullable(false);
            map.Type<NHibernate.Type.DateTimeType>();
        });

        Property(usr => usr.CreatedOn, map =>
        {
            map.Column("created_on");
            // map.NotNullable(true);
            map.Type<NHibernate.Type.DateTimeType>();
        });
        Property(usr => usr.CreatorId, map =>
        {
            map.Column("created_by");
        });
        Property(usr => usr.LastModifiedOn, map =>
        {
            map.Column("last_updated_on");
            map.NotNullable(false);
            map.Type<NHibernate.Type.DateTimeType>();
        });
        Property(usr => usr.LastModifierId, map =>
        {
            map.Column("last_updated_by");
        });

        Bag(u => u.Roles, map =>
        {
            map.Table("users_in_roles");
            map.Key(k => k.Column("user_id"));
        }, rel => rel.ManyToMany(r => r.Column("role_id")));

        Bag(u => u.Claims, map =>
        {
            map.Key(k => { k.Column("user_id"); k.Update(false); });
            map.Cascade(Cascade.All | Cascade.DeleteOrphans);
        }, rel => rel.OneToMany());

        Bag(usr => usr.Logins, map =>
        {
            map.Key(k => { k.Column("user_id"); k.Update(false); });
            map.Cascade(Cascade.All | Cascade.DeleteOrphans);
        }, rel => rel.OneToMany());
    }
}



public class UserLoginMap : ClassMapping<UserLogin>
{
    public UserLoginMap()
    {
        Table("users_logins");

        Id("id", map => map.Type(new NHibernate.Type.Int32Type()));

        Property(l => l.LoginProvider, map => map.Column("login_provider"));
        Property(l => l.ProviderKey, map => map.Column("provider_key"));

        ManyToOne(l => l.User, map => map.Column("user_id"));
    }
}



public class UserClaimMap : ClassMapping<IdentityUserClaim<int>>
{
    public UserClaimMap()
    {
        Table("users_claims");

        Id(c => c.Id);

        Property(c => c.ClaimType, map =>
        {
            map.Column("type");
            map.Length(256);
        });

        Property(c => c.ClaimValue, map =>
        {
            map.Column("value");
        });

        Property(c => c.UserId, map =>
        {
            map.Column("user_id");
        });
    }
}



public class RoleMap : ClassMapping<UserRole>
{
    public RoleMap()
    {
        Table("roles");

        Id(role => role.Id);

        Property(r => r.Name, map =>
        {
            map.Column("name");
            map.Length(256);
            map.NotNullable(true);
            map.Unique(true);
        });
        Property(r => r.NormalizedName, map =>
        {
            map.Column("name_normalized");
        });

        Property(r => r.Description, map =>
        {
            map.Column("description");
            map.Length(1000);
        });

        Property(r => r.ConcurrencyStamp, map =>
        {
            map.Column("stamp_concurrency");
            map.NotNullable(false);
        });

        Property(usr => usr.CreatedOn, map =>
        {
            map.Column("created_on");
            // map.NotNullable(true);
            map.Type<NHibernate.Type.DateTimeType>();
        });
        Property(usr => usr.CreatedBy, map =>
        {
            map.Column("created_by");
        });
        Property(usr => usr.LastModifiedOn, map =>
        {
            map.Column("last_updated_on");
            map.NotNullable(false);
            map.Type<NHibernate.Type.DateTimeType>();
        });
        Property(usr => usr.LastModifiedBy, map =>
        {
            map.Column("last_updated_by");
        });

        Bag(r => r.Users, map =>
        {
            map.Table("users_in_roles");
            map.Cascade(Cascade.None);
            map.Key(k => k.Column("role_id"));
        }, rel => rel.ManyToMany(usr => usr.Column("user_id")));

        Bag(r => r.Permissions, map =>
        {
            map.Table("roles_with_permissions");
            map.Cascade(Cascade.None);
            map.Key(k => k.Column("role_id"));
        }, rel => rel.ManyToMany(per => per.Column("permission_id")));
    }
}



public class RoleClaimMap : ClassMapping<IdentityRoleClaim<int>>
{
    public RoleClaimMap()
    {
        Table("roles_claims");

        Id(c => c.Id, map =>
        {
            map.Generator(Generators.Native);
        });

        Property(c => c.ClaimType, map =>
        {
            map.Column("type");
            map.Length(256);
        });

        Property(c => c.ClaimValue, map =>
        {
            map.Column("value");
        });

        Property(c => c.RoleId, map => map.Column("role_id"));
    }
}



public class PermissionMap : ClassMapping<UserPermission>
{
    public PermissionMap()
    {
        Table("permissions");

        Id(permission => permission.Id);

        Property(perm => perm.Name, map =>
        {
            map.Length(256);
            map.NotNullable(true);
            map.Unique(true);
        });

        Property(perm => perm.Description, map =>
        {
            map.Length(1000);
        });

        Property(perm => perm.Route, map =>
        {
            map.Length(256);
            map.NotNullable(true);
        });

        Property(perm => perm.AllowedRequests, m =>
        {
            m.Column("accept_types");
            m.Length(8096);
            m.Type<JsonMappableType<System.Collections.Generic.List<string>>>();
        });

        Property(usr => usr.CreatedOn, map =>
        {
            map.Column("created_on");
            // map.NotNullable(true);
            map.Type<NHibernate.Type.DateTimeType>();
        });
        Property(usr => usr.CreatedBy, map =>
        {
            map.Column("created_by");
        });
        Property(usr => usr.LastModifiedOn, map =>
        {
            map.Column("last_updated_on");
            map.NotNullable(false);
            map.Type<NHibernate.Type.DateTimeType>();
        });
        Property(usr => usr.LastModifiedBy, map =>
        {
            map.Column("last_updated_by");
        });

        Bag(r => r.Roles, map =>
        {
            map.Table("roles_with_permissions");
            map.Cascade(Cascade.None);
            map.Key(k => k.Column("permission_id"));
        }, rel => rel.ManyToMany(role => role.Column("role_id")));
    }
}
