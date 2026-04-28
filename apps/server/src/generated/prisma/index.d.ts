
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model Household
 * 
 */
export type Household = $Result.DefaultSelection<Prisma.$HouseholdPayload>
/**
 * Model HouseholdMember
 * 
 */
export type HouseholdMember = $Result.DefaultSelection<Prisma.$HouseholdMemberPayload>
/**
 * Model HouseholdInvite
 * 
 */
export type HouseholdInvite = $Result.DefaultSelection<Prisma.$HouseholdInvitePayload>
/**
 * Model Freezer
 * 
 */
export type Freezer = $Result.DefaultSelection<Prisma.$FreezerPayload>
/**
 * Model Compartment
 * 
 */
export type Compartment = $Result.DefaultSelection<Prisma.$CompartmentPayload>
/**
 * Model FreezerItem
 * 
 */
export type FreezerItem = $Result.DefaultSelection<Prisma.$FreezerItemPayload>
/**
 * Model ItemChangeLog
 * 
 */
export type ItemChangeLog = $Result.DefaultSelection<Prisma.$ItemChangeLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const HouseholdRole: {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER'
};

export type HouseholdRole = (typeof HouseholdRole)[keyof typeof HouseholdRole]

}

export type HouseholdRole = $Enums.HouseholdRole

export const HouseholdRole: typeof $Enums.HouseholdRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.household`: Exposes CRUD operations for the **Household** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Households
    * const households = await prisma.household.findMany()
    * ```
    */
  get household(): Prisma.HouseholdDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.householdMember`: Exposes CRUD operations for the **HouseholdMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HouseholdMembers
    * const householdMembers = await prisma.householdMember.findMany()
    * ```
    */
  get householdMember(): Prisma.HouseholdMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.householdInvite`: Exposes CRUD operations for the **HouseholdInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HouseholdInvites
    * const householdInvites = await prisma.householdInvite.findMany()
    * ```
    */
  get householdInvite(): Prisma.HouseholdInviteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.freezer`: Exposes CRUD operations for the **Freezer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Freezers
    * const freezers = await prisma.freezer.findMany()
    * ```
    */
  get freezer(): Prisma.FreezerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.compartment`: Exposes CRUD operations for the **Compartment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Compartments
    * const compartments = await prisma.compartment.findMany()
    * ```
    */
  get compartment(): Prisma.CompartmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.freezerItem`: Exposes CRUD operations for the **FreezerItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FreezerItems
    * const freezerItems = await prisma.freezerItem.findMany()
    * ```
    */
  get freezerItem(): Prisma.FreezerItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemChangeLog`: Exposes CRUD operations for the **ItemChangeLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemChangeLogs
    * const itemChangeLogs = await prisma.itemChangeLog.findMany()
    * ```
    */
  get itemChangeLog(): Prisma.ItemChangeLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    RefreshToken: 'RefreshToken',
    Household: 'Household',
    HouseholdMember: 'HouseholdMember',
    HouseholdInvite: 'HouseholdInvite',
    Freezer: 'Freezer',
    Compartment: 'Compartment',
    FreezerItem: 'FreezerItem',
    ItemChangeLog: 'ItemChangeLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "refreshToken" | "household" | "householdMember" | "householdInvite" | "freezer" | "compartment" | "freezerItem" | "itemChangeLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      Household: {
        payload: Prisma.$HouseholdPayload<ExtArgs>
        fields: Prisma.HouseholdFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HouseholdFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HouseholdFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          findFirst: {
            args: Prisma.HouseholdFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HouseholdFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          findMany: {
            args: Prisma.HouseholdFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>[]
          }
          create: {
            args: Prisma.HouseholdCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          createMany: {
            args: Prisma.HouseholdCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HouseholdCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>[]
          }
          delete: {
            args: Prisma.HouseholdDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          update: {
            args: Prisma.HouseholdUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          deleteMany: {
            args: Prisma.HouseholdDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HouseholdUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HouseholdUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>[]
          }
          upsert: {
            args: Prisma.HouseholdUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdPayload>
          }
          aggregate: {
            args: Prisma.HouseholdAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHousehold>
          }
          groupBy: {
            args: Prisma.HouseholdGroupByArgs<ExtArgs>
            result: $Utils.Optional<HouseholdGroupByOutputType>[]
          }
          count: {
            args: Prisma.HouseholdCountArgs<ExtArgs>
            result: $Utils.Optional<HouseholdCountAggregateOutputType> | number
          }
        }
      }
      HouseholdMember: {
        payload: Prisma.$HouseholdMemberPayload<ExtArgs>
        fields: Prisma.HouseholdMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HouseholdMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HouseholdMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload>
          }
          findFirst: {
            args: Prisma.HouseholdMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HouseholdMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload>
          }
          findMany: {
            args: Prisma.HouseholdMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload>[]
          }
          create: {
            args: Prisma.HouseholdMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload>
          }
          createMany: {
            args: Prisma.HouseholdMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HouseholdMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload>[]
          }
          delete: {
            args: Prisma.HouseholdMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload>
          }
          update: {
            args: Prisma.HouseholdMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload>
          }
          deleteMany: {
            args: Prisma.HouseholdMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HouseholdMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HouseholdMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload>[]
          }
          upsert: {
            args: Prisma.HouseholdMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdMemberPayload>
          }
          aggregate: {
            args: Prisma.HouseholdMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHouseholdMember>
          }
          groupBy: {
            args: Prisma.HouseholdMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<HouseholdMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.HouseholdMemberCountArgs<ExtArgs>
            result: $Utils.Optional<HouseholdMemberCountAggregateOutputType> | number
          }
        }
      }
      HouseholdInvite: {
        payload: Prisma.$HouseholdInvitePayload<ExtArgs>
        fields: Prisma.HouseholdInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HouseholdInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HouseholdInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload>
          }
          findFirst: {
            args: Prisma.HouseholdInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HouseholdInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload>
          }
          findMany: {
            args: Prisma.HouseholdInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload>[]
          }
          create: {
            args: Prisma.HouseholdInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload>
          }
          createMany: {
            args: Prisma.HouseholdInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HouseholdInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload>[]
          }
          delete: {
            args: Prisma.HouseholdInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload>
          }
          update: {
            args: Prisma.HouseholdInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload>
          }
          deleteMany: {
            args: Prisma.HouseholdInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HouseholdInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HouseholdInviteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload>[]
          }
          upsert: {
            args: Prisma.HouseholdInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HouseholdInvitePayload>
          }
          aggregate: {
            args: Prisma.HouseholdInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHouseholdInvite>
          }
          groupBy: {
            args: Prisma.HouseholdInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<HouseholdInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.HouseholdInviteCountArgs<ExtArgs>
            result: $Utils.Optional<HouseholdInviteCountAggregateOutputType> | number
          }
        }
      }
      Freezer: {
        payload: Prisma.$FreezerPayload<ExtArgs>
        fields: Prisma.FreezerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FreezerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FreezerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload>
          }
          findFirst: {
            args: Prisma.FreezerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FreezerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload>
          }
          findMany: {
            args: Prisma.FreezerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload>[]
          }
          create: {
            args: Prisma.FreezerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload>
          }
          createMany: {
            args: Prisma.FreezerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FreezerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload>[]
          }
          delete: {
            args: Prisma.FreezerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload>
          }
          update: {
            args: Prisma.FreezerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload>
          }
          deleteMany: {
            args: Prisma.FreezerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FreezerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FreezerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload>[]
          }
          upsert: {
            args: Prisma.FreezerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerPayload>
          }
          aggregate: {
            args: Prisma.FreezerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFreezer>
          }
          groupBy: {
            args: Prisma.FreezerGroupByArgs<ExtArgs>
            result: $Utils.Optional<FreezerGroupByOutputType>[]
          }
          count: {
            args: Prisma.FreezerCountArgs<ExtArgs>
            result: $Utils.Optional<FreezerCountAggregateOutputType> | number
          }
        }
      }
      Compartment: {
        payload: Prisma.$CompartmentPayload<ExtArgs>
        fields: Prisma.CompartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload>
          }
          findFirst: {
            args: Prisma.CompartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload>
          }
          findMany: {
            args: Prisma.CompartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload>[]
          }
          create: {
            args: Prisma.CompartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload>
          }
          createMany: {
            args: Prisma.CompartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload>[]
          }
          delete: {
            args: Prisma.CompartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload>
          }
          update: {
            args: Prisma.CompartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload>
          }
          deleteMany: {
            args: Prisma.CompartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompartmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload>[]
          }
          upsert: {
            args: Prisma.CompartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompartmentPayload>
          }
          aggregate: {
            args: Prisma.CompartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompartment>
          }
          groupBy: {
            args: Prisma.CompartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompartmentCountArgs<ExtArgs>
            result: $Utils.Optional<CompartmentCountAggregateOutputType> | number
          }
        }
      }
      FreezerItem: {
        payload: Prisma.$FreezerItemPayload<ExtArgs>
        fields: Prisma.FreezerItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FreezerItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FreezerItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload>
          }
          findFirst: {
            args: Prisma.FreezerItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FreezerItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload>
          }
          findMany: {
            args: Prisma.FreezerItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload>[]
          }
          create: {
            args: Prisma.FreezerItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload>
          }
          createMany: {
            args: Prisma.FreezerItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FreezerItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload>[]
          }
          delete: {
            args: Prisma.FreezerItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload>
          }
          update: {
            args: Prisma.FreezerItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload>
          }
          deleteMany: {
            args: Prisma.FreezerItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FreezerItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FreezerItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload>[]
          }
          upsert: {
            args: Prisma.FreezerItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FreezerItemPayload>
          }
          aggregate: {
            args: Prisma.FreezerItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFreezerItem>
          }
          groupBy: {
            args: Prisma.FreezerItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<FreezerItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.FreezerItemCountArgs<ExtArgs>
            result: $Utils.Optional<FreezerItemCountAggregateOutputType> | number
          }
        }
      }
      ItemChangeLog: {
        payload: Prisma.$ItemChangeLogPayload<ExtArgs>
        fields: Prisma.ItemChangeLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemChangeLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemChangeLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload>
          }
          findFirst: {
            args: Prisma.ItemChangeLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemChangeLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload>
          }
          findMany: {
            args: Prisma.ItemChangeLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload>[]
          }
          create: {
            args: Prisma.ItemChangeLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload>
          }
          createMany: {
            args: Prisma.ItemChangeLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemChangeLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload>[]
          }
          delete: {
            args: Prisma.ItemChangeLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload>
          }
          update: {
            args: Prisma.ItemChangeLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload>
          }
          deleteMany: {
            args: Prisma.ItemChangeLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemChangeLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemChangeLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload>[]
          }
          upsert: {
            args: Prisma.ItemChangeLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemChangeLogPayload>
          }
          aggregate: {
            args: Prisma.ItemChangeLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemChangeLog>
          }
          groupBy: {
            args: Prisma.ItemChangeLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemChangeLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemChangeLogCountArgs<ExtArgs>
            result: $Utils.Optional<ItemChangeLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    refreshToken?: RefreshTokenOmit
    household?: HouseholdOmit
    householdMember?: HouseholdMemberOmit
    householdInvite?: HouseholdInviteOmit
    freezer?: FreezerOmit
    compartment?: CompartmentOmit
    freezerItem?: FreezerItemOmit
    itemChangeLog?: ItemChangeLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    memberships: number
    ownedHouseholds: number
    refreshTokens: number
    createdItems: number
    updatedItems: number
    changeLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    ownedHouseholds?: boolean | UserCountOutputTypeCountOwnedHouseholdsArgs
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    createdItems?: boolean | UserCountOutputTypeCountCreatedItemsArgs
    updatedItems?: boolean | UserCountOutputTypeCountUpdatedItemsArgs
    changeLogs?: boolean | UserCountOutputTypeCountChangeLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedHouseholdsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FreezerItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUpdatedItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FreezerItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChangeLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemChangeLogWhereInput
  }


  /**
   * Count Type HouseholdCountOutputType
   */

  export type HouseholdCountOutputType = {
    members: number
    freezers: number
    items: number
    invites: number
  }

  export type HouseholdCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | HouseholdCountOutputTypeCountMembersArgs
    freezers?: boolean | HouseholdCountOutputTypeCountFreezersArgs
    items?: boolean | HouseholdCountOutputTypeCountItemsArgs
    invites?: boolean | HouseholdCountOutputTypeCountInvitesArgs
  }

  // Custom InputTypes
  /**
   * HouseholdCountOutputType without action
   */
  export type HouseholdCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdCountOutputType
     */
    select?: HouseholdCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HouseholdCountOutputType without action
   */
  export type HouseholdCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdMemberWhereInput
  }

  /**
   * HouseholdCountOutputType without action
   */
  export type HouseholdCountOutputTypeCountFreezersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FreezerWhereInput
  }

  /**
   * HouseholdCountOutputType without action
   */
  export type HouseholdCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FreezerItemWhereInput
  }

  /**
   * HouseholdCountOutputType without action
   */
  export type HouseholdCountOutputTypeCountInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdInviteWhereInput
  }


  /**
   * Count Type FreezerCountOutputType
   */

  export type FreezerCountOutputType = {
    compartments: number
    items: number
  }

  export type FreezerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    compartments?: boolean | FreezerCountOutputTypeCountCompartmentsArgs
    items?: boolean | FreezerCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * FreezerCountOutputType without action
   */
  export type FreezerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerCountOutputType
     */
    select?: FreezerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FreezerCountOutputType without action
   */
  export type FreezerCountOutputTypeCountCompartmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompartmentWhereInput
  }

  /**
   * FreezerCountOutputType without action
   */
  export type FreezerCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FreezerItemWhereInput
  }


  /**
   * Count Type CompartmentCountOutputType
   */

  export type CompartmentCountOutputType = {
    items: number
  }

  export type CompartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | CompartmentCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * CompartmentCountOutputType without action
   */
  export type CompartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompartmentCountOutputType
     */
    select?: CompartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompartmentCountOutputType without action
   */
  export type CompartmentCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FreezerItemWhereInput
  }


  /**
   * Count Type FreezerItemCountOutputType
   */

  export type FreezerItemCountOutputType = {
    changeLogs: number
  }

  export type FreezerItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    changeLogs?: boolean | FreezerItemCountOutputTypeCountChangeLogsArgs
  }

  // Custom InputTypes
  /**
   * FreezerItemCountOutputType without action
   */
  export type FreezerItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItemCountOutputType
     */
    select?: FreezerItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FreezerItemCountOutputType without action
   */
  export type FreezerItemCountOutputTypeCountChangeLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemChangeLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    name: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    ownedHouseholds?: boolean | User$ownedHouseholdsArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    createdItems?: boolean | User$createdItemsArgs<ExtArgs>
    updatedItems?: boolean | User$updatedItemsArgs<ExtArgs>
    changeLogs?: boolean | User$changeLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    ownedHouseholds?: boolean | User$ownedHouseholdsArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    createdItems?: boolean | User$createdItemsArgs<ExtArgs>
    updatedItems?: boolean | User$updatedItemsArgs<ExtArgs>
    changeLogs?: boolean | User$changeLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      memberships: Prisma.$HouseholdMemberPayload<ExtArgs>[]
      ownedHouseholds: Prisma.$HouseholdPayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      createdItems: Prisma.$FreezerItemPayload<ExtArgs>[]
      updatedItems: Prisma.$FreezerItemPayload<ExtArgs>[]
      changeLogs: Prisma.$ItemChangeLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ownedHouseholds<T extends User$ownedHouseholdsArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedHouseholdsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdItems<T extends User$createdItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    updatedItems<T extends User$updatedItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$updatedItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    changeLogs<T extends User$changeLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$changeLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    where?: HouseholdMemberWhereInput
    orderBy?: HouseholdMemberOrderByWithRelationInput | HouseholdMemberOrderByWithRelationInput[]
    cursor?: HouseholdMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HouseholdMemberScalarFieldEnum | HouseholdMemberScalarFieldEnum[]
  }

  /**
   * User.ownedHouseholds
   */
  export type User$ownedHouseholdsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    where?: HouseholdWhereInput
    orderBy?: HouseholdOrderByWithRelationInput | HouseholdOrderByWithRelationInput[]
    cursor?: HouseholdWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HouseholdScalarFieldEnum | HouseholdScalarFieldEnum[]
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.createdItems
   */
  export type User$createdItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    where?: FreezerItemWhereInput
    orderBy?: FreezerItemOrderByWithRelationInput | FreezerItemOrderByWithRelationInput[]
    cursor?: FreezerItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FreezerItemScalarFieldEnum | FreezerItemScalarFieldEnum[]
  }

  /**
   * User.updatedItems
   */
  export type User$updatedItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    where?: FreezerItemWhereInput
    orderBy?: FreezerItemOrderByWithRelationInput | FreezerItemOrderByWithRelationInput[]
    cursor?: FreezerItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FreezerItemScalarFieldEnum | FreezerItemScalarFieldEnum[]
  }

  /**
   * User.changeLogs
   */
  export type User$changeLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    where?: ItemChangeLogWhereInput
    orderBy?: ItemChangeLogOrderByWithRelationInput | ItemChangeLogOrderByWithRelationInput[]
    cursor?: ItemChangeLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemChangeLogScalarFieldEnum | ItemChangeLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    expiresAt: number
    revokedAt: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    expiresAt: Date
    revokedAt: Date | null
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "expiresAt" | "revokedAt" | "createdAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      expiresAt: Date
      revokedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revokedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model Household
   */

  export type AggregateHousehold = {
    _count: HouseholdCountAggregateOutputType | null
    _min: HouseholdMinAggregateOutputType | null
    _max: HouseholdMaxAggregateOutputType | null
  }

  export type HouseholdMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    ownerId: string | null
  }

  export type HouseholdMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    ownerId: string | null
  }

  export type HouseholdCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    ownerId: number
    _all: number
  }


  export type HouseholdMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    ownerId?: true
  }

  export type HouseholdMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    ownerId?: true
  }

  export type HouseholdCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    ownerId?: true
    _all?: true
  }

  export type HouseholdAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Household to aggregate.
     */
    where?: HouseholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Households to fetch.
     */
    orderBy?: HouseholdOrderByWithRelationInput | HouseholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HouseholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Households from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Households.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Households
    **/
    _count?: true | HouseholdCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HouseholdMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HouseholdMaxAggregateInputType
  }

  export type GetHouseholdAggregateType<T extends HouseholdAggregateArgs> = {
        [P in keyof T & keyof AggregateHousehold]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHousehold[P]>
      : GetScalarType<T[P], AggregateHousehold[P]>
  }




  export type HouseholdGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdWhereInput
    orderBy?: HouseholdOrderByWithAggregationInput | HouseholdOrderByWithAggregationInput[]
    by: HouseholdScalarFieldEnum[] | HouseholdScalarFieldEnum
    having?: HouseholdScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HouseholdCountAggregateInputType | true
    _min?: HouseholdMinAggregateInputType
    _max?: HouseholdMaxAggregateInputType
  }

  export type HouseholdGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    ownerId: string
    _count: HouseholdCountAggregateOutputType | null
    _min: HouseholdMinAggregateOutputType | null
    _max: HouseholdMaxAggregateOutputType | null
  }

  type GetHouseholdGroupByPayload<T extends HouseholdGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HouseholdGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HouseholdGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HouseholdGroupByOutputType[P]>
            : GetScalarType<T[P], HouseholdGroupByOutputType[P]>
        }
      >
    >


  export type HouseholdSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    ownerId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Household$membersArgs<ExtArgs>
    freezers?: boolean | Household$freezersArgs<ExtArgs>
    items?: boolean | Household$itemsArgs<ExtArgs>
    invites?: boolean | Household$invitesArgs<ExtArgs>
    _count?: boolean | HouseholdCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["household"]>

  export type HouseholdSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    ownerId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["household"]>

  export type HouseholdSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    ownerId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["household"]>

  export type HouseholdSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    ownerId?: boolean
  }

  export type HouseholdOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "ownerId", ExtArgs["result"]["household"]>
  export type HouseholdInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Household$membersArgs<ExtArgs>
    freezers?: boolean | Household$freezersArgs<ExtArgs>
    items?: boolean | Household$itemsArgs<ExtArgs>
    invites?: boolean | Household$invitesArgs<ExtArgs>
    _count?: boolean | HouseholdCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HouseholdIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HouseholdIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $HouseholdPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Household"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$HouseholdMemberPayload<ExtArgs>[]
      freezers: Prisma.$FreezerPayload<ExtArgs>[]
      items: Prisma.$FreezerItemPayload<ExtArgs>[]
      invites: Prisma.$HouseholdInvitePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      ownerId: string
    }, ExtArgs["result"]["household"]>
    composites: {}
  }

  type HouseholdGetPayload<S extends boolean | null | undefined | HouseholdDefaultArgs> = $Result.GetResult<Prisma.$HouseholdPayload, S>

  type HouseholdCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HouseholdFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HouseholdCountAggregateInputType | true
    }

  export interface HouseholdDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Household'], meta: { name: 'Household' } }
    /**
     * Find zero or one Household that matches the filter.
     * @param {HouseholdFindUniqueArgs} args - Arguments to find a Household
     * @example
     * // Get one Household
     * const household = await prisma.household.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HouseholdFindUniqueArgs>(args: SelectSubset<T, HouseholdFindUniqueArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Household that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HouseholdFindUniqueOrThrowArgs} args - Arguments to find a Household
     * @example
     * // Get one Household
     * const household = await prisma.household.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HouseholdFindUniqueOrThrowArgs>(args: SelectSubset<T, HouseholdFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Household that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdFindFirstArgs} args - Arguments to find a Household
     * @example
     * // Get one Household
     * const household = await prisma.household.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HouseholdFindFirstArgs>(args?: SelectSubset<T, HouseholdFindFirstArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Household that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdFindFirstOrThrowArgs} args - Arguments to find a Household
     * @example
     * // Get one Household
     * const household = await prisma.household.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HouseholdFindFirstOrThrowArgs>(args?: SelectSubset<T, HouseholdFindFirstOrThrowArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Households that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Households
     * const households = await prisma.household.findMany()
     * 
     * // Get first 10 Households
     * const households = await prisma.household.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const householdWithIdOnly = await prisma.household.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HouseholdFindManyArgs>(args?: SelectSubset<T, HouseholdFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Household.
     * @param {HouseholdCreateArgs} args - Arguments to create a Household.
     * @example
     * // Create one Household
     * const Household = await prisma.household.create({
     *   data: {
     *     // ... data to create a Household
     *   }
     * })
     * 
     */
    create<T extends HouseholdCreateArgs>(args: SelectSubset<T, HouseholdCreateArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Households.
     * @param {HouseholdCreateManyArgs} args - Arguments to create many Households.
     * @example
     * // Create many Households
     * const household = await prisma.household.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HouseholdCreateManyArgs>(args?: SelectSubset<T, HouseholdCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Households and returns the data saved in the database.
     * @param {HouseholdCreateManyAndReturnArgs} args - Arguments to create many Households.
     * @example
     * // Create many Households
     * const household = await prisma.household.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Households and only return the `id`
     * const householdWithIdOnly = await prisma.household.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HouseholdCreateManyAndReturnArgs>(args?: SelectSubset<T, HouseholdCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Household.
     * @param {HouseholdDeleteArgs} args - Arguments to delete one Household.
     * @example
     * // Delete one Household
     * const Household = await prisma.household.delete({
     *   where: {
     *     // ... filter to delete one Household
     *   }
     * })
     * 
     */
    delete<T extends HouseholdDeleteArgs>(args: SelectSubset<T, HouseholdDeleteArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Household.
     * @param {HouseholdUpdateArgs} args - Arguments to update one Household.
     * @example
     * // Update one Household
     * const household = await prisma.household.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HouseholdUpdateArgs>(args: SelectSubset<T, HouseholdUpdateArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Households.
     * @param {HouseholdDeleteManyArgs} args - Arguments to filter Households to delete.
     * @example
     * // Delete a few Households
     * const { count } = await prisma.household.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HouseholdDeleteManyArgs>(args?: SelectSubset<T, HouseholdDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Households.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Households
     * const household = await prisma.household.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HouseholdUpdateManyArgs>(args: SelectSubset<T, HouseholdUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Households and returns the data updated in the database.
     * @param {HouseholdUpdateManyAndReturnArgs} args - Arguments to update many Households.
     * @example
     * // Update many Households
     * const household = await prisma.household.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Households and only return the `id`
     * const householdWithIdOnly = await prisma.household.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HouseholdUpdateManyAndReturnArgs>(args: SelectSubset<T, HouseholdUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Household.
     * @param {HouseholdUpsertArgs} args - Arguments to update or create a Household.
     * @example
     * // Update or create a Household
     * const household = await prisma.household.upsert({
     *   create: {
     *     // ... data to create a Household
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Household we want to update
     *   }
     * })
     */
    upsert<T extends HouseholdUpsertArgs>(args: SelectSubset<T, HouseholdUpsertArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Households.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdCountArgs} args - Arguments to filter Households to count.
     * @example
     * // Count the number of Households
     * const count = await prisma.household.count({
     *   where: {
     *     // ... the filter for the Households we want to count
     *   }
     * })
    **/
    count<T extends HouseholdCountArgs>(
      args?: Subset<T, HouseholdCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HouseholdCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Household.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HouseholdAggregateArgs>(args: Subset<T, HouseholdAggregateArgs>): Prisma.PrismaPromise<GetHouseholdAggregateType<T>>

    /**
     * Group by Household.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HouseholdGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HouseholdGroupByArgs['orderBy'] }
        : { orderBy?: HouseholdGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HouseholdGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHouseholdGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Household model
   */
  readonly fields: HouseholdFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Household.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HouseholdClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Household$membersArgs<ExtArgs> = {}>(args?: Subset<T, Household$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    freezers<T extends Household$freezersArgs<ExtArgs> = {}>(args?: Subset<T, Household$freezersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    items<T extends Household$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Household$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invites<T extends Household$invitesArgs<ExtArgs> = {}>(args?: Subset<T, Household$invitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Household model
   */
  interface HouseholdFieldRefs {
    readonly id: FieldRef<"Household", 'String'>
    readonly name: FieldRef<"Household", 'String'>
    readonly createdAt: FieldRef<"Household", 'DateTime'>
    readonly ownerId: FieldRef<"Household", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Household findUnique
   */
  export type HouseholdFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter, which Household to fetch.
     */
    where: HouseholdWhereUniqueInput
  }

  /**
   * Household findUniqueOrThrow
   */
  export type HouseholdFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter, which Household to fetch.
     */
    where: HouseholdWhereUniqueInput
  }

  /**
   * Household findFirst
   */
  export type HouseholdFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter, which Household to fetch.
     */
    where?: HouseholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Households to fetch.
     */
    orderBy?: HouseholdOrderByWithRelationInput | HouseholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Households.
     */
    cursor?: HouseholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Households from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Households.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Households.
     */
    distinct?: HouseholdScalarFieldEnum | HouseholdScalarFieldEnum[]
  }

  /**
   * Household findFirstOrThrow
   */
  export type HouseholdFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter, which Household to fetch.
     */
    where?: HouseholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Households to fetch.
     */
    orderBy?: HouseholdOrderByWithRelationInput | HouseholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Households.
     */
    cursor?: HouseholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Households from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Households.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Households.
     */
    distinct?: HouseholdScalarFieldEnum | HouseholdScalarFieldEnum[]
  }

  /**
   * Household findMany
   */
  export type HouseholdFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter, which Households to fetch.
     */
    where?: HouseholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Households to fetch.
     */
    orderBy?: HouseholdOrderByWithRelationInput | HouseholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Households.
     */
    cursor?: HouseholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Households from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Households.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Households.
     */
    distinct?: HouseholdScalarFieldEnum | HouseholdScalarFieldEnum[]
  }

  /**
   * Household create
   */
  export type HouseholdCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * The data needed to create a Household.
     */
    data: XOR<HouseholdCreateInput, HouseholdUncheckedCreateInput>
  }

  /**
   * Household createMany
   */
  export type HouseholdCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Households.
     */
    data: HouseholdCreateManyInput | HouseholdCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Household createManyAndReturn
   */
  export type HouseholdCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * The data used to create many Households.
     */
    data: HouseholdCreateManyInput | HouseholdCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Household update
   */
  export type HouseholdUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * The data needed to update a Household.
     */
    data: XOR<HouseholdUpdateInput, HouseholdUncheckedUpdateInput>
    /**
     * Choose, which Household to update.
     */
    where: HouseholdWhereUniqueInput
  }

  /**
   * Household updateMany
   */
  export type HouseholdUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Households.
     */
    data: XOR<HouseholdUpdateManyMutationInput, HouseholdUncheckedUpdateManyInput>
    /**
     * Filter which Households to update
     */
    where?: HouseholdWhereInput
    /**
     * Limit how many Households to update.
     */
    limit?: number
  }

  /**
   * Household updateManyAndReturn
   */
  export type HouseholdUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * The data used to update Households.
     */
    data: XOR<HouseholdUpdateManyMutationInput, HouseholdUncheckedUpdateManyInput>
    /**
     * Filter which Households to update
     */
    where?: HouseholdWhereInput
    /**
     * Limit how many Households to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Household upsert
   */
  export type HouseholdUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * The filter to search for the Household to update in case it exists.
     */
    where: HouseholdWhereUniqueInput
    /**
     * In case the Household found by the `where` argument doesn't exist, create a new Household with this data.
     */
    create: XOR<HouseholdCreateInput, HouseholdUncheckedCreateInput>
    /**
     * In case the Household was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HouseholdUpdateInput, HouseholdUncheckedUpdateInput>
  }

  /**
   * Household delete
   */
  export type HouseholdDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
    /**
     * Filter which Household to delete.
     */
    where: HouseholdWhereUniqueInput
  }

  /**
   * Household deleteMany
   */
  export type HouseholdDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Households to delete
     */
    where?: HouseholdWhereInput
    /**
     * Limit how many Households to delete.
     */
    limit?: number
  }

  /**
   * Household.members
   */
  export type Household$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    where?: HouseholdMemberWhereInput
    orderBy?: HouseholdMemberOrderByWithRelationInput | HouseholdMemberOrderByWithRelationInput[]
    cursor?: HouseholdMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HouseholdMemberScalarFieldEnum | HouseholdMemberScalarFieldEnum[]
  }

  /**
   * Household.freezers
   */
  export type Household$freezersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
    where?: FreezerWhereInput
    orderBy?: FreezerOrderByWithRelationInput | FreezerOrderByWithRelationInput[]
    cursor?: FreezerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FreezerScalarFieldEnum | FreezerScalarFieldEnum[]
  }

  /**
   * Household.items
   */
  export type Household$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    where?: FreezerItemWhereInput
    orderBy?: FreezerItemOrderByWithRelationInput | FreezerItemOrderByWithRelationInput[]
    cursor?: FreezerItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FreezerItemScalarFieldEnum | FreezerItemScalarFieldEnum[]
  }

  /**
   * Household.invites
   */
  export type Household$invitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
    where?: HouseholdInviteWhereInput
    orderBy?: HouseholdInviteOrderByWithRelationInput | HouseholdInviteOrderByWithRelationInput[]
    cursor?: HouseholdInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HouseholdInviteScalarFieldEnum | HouseholdInviteScalarFieldEnum[]
  }

  /**
   * Household without action
   */
  export type HouseholdDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Household
     */
    select?: HouseholdSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Household
     */
    omit?: HouseholdOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInclude<ExtArgs> | null
  }


  /**
   * Model HouseholdMember
   */

  export type AggregateHouseholdMember = {
    _count: HouseholdMemberCountAggregateOutputType | null
    _min: HouseholdMemberMinAggregateOutputType | null
    _max: HouseholdMemberMaxAggregateOutputType | null
  }

  export type HouseholdMemberMinAggregateOutputType = {
    id: string | null
    householdId: string | null
    userId: string | null
    role: $Enums.HouseholdRole | null
    joinedAt: Date | null
  }

  export type HouseholdMemberMaxAggregateOutputType = {
    id: string | null
    householdId: string | null
    userId: string | null
    role: $Enums.HouseholdRole | null
    joinedAt: Date | null
  }

  export type HouseholdMemberCountAggregateOutputType = {
    id: number
    householdId: number
    userId: number
    role: number
    joinedAt: number
    _all: number
  }


  export type HouseholdMemberMinAggregateInputType = {
    id?: true
    householdId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type HouseholdMemberMaxAggregateInputType = {
    id?: true
    householdId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type HouseholdMemberCountAggregateInputType = {
    id?: true
    householdId?: true
    userId?: true
    role?: true
    joinedAt?: true
    _all?: true
  }

  export type HouseholdMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HouseholdMember to aggregate.
     */
    where?: HouseholdMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdMembers to fetch.
     */
    orderBy?: HouseholdMemberOrderByWithRelationInput | HouseholdMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HouseholdMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HouseholdMembers
    **/
    _count?: true | HouseholdMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HouseholdMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HouseholdMemberMaxAggregateInputType
  }

  export type GetHouseholdMemberAggregateType<T extends HouseholdMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateHouseholdMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHouseholdMember[P]>
      : GetScalarType<T[P], AggregateHouseholdMember[P]>
  }




  export type HouseholdMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdMemberWhereInput
    orderBy?: HouseholdMemberOrderByWithAggregationInput | HouseholdMemberOrderByWithAggregationInput[]
    by: HouseholdMemberScalarFieldEnum[] | HouseholdMemberScalarFieldEnum
    having?: HouseholdMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HouseholdMemberCountAggregateInputType | true
    _min?: HouseholdMemberMinAggregateInputType
    _max?: HouseholdMemberMaxAggregateInputType
  }

  export type HouseholdMemberGroupByOutputType = {
    id: string
    householdId: string
    userId: string
    role: $Enums.HouseholdRole
    joinedAt: Date
    _count: HouseholdMemberCountAggregateOutputType | null
    _min: HouseholdMemberMinAggregateOutputType | null
    _max: HouseholdMemberMaxAggregateOutputType | null
  }

  type GetHouseholdMemberGroupByPayload<T extends HouseholdMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HouseholdMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HouseholdMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HouseholdMemberGroupByOutputType[P]>
            : GetScalarType<T[P], HouseholdMemberGroupByOutputType[P]>
        }
      >
    >


  export type HouseholdMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["householdMember"]>

  export type HouseholdMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["householdMember"]>

  export type HouseholdMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["householdMember"]>

  export type HouseholdMemberSelectScalar = {
    id?: boolean
    householdId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
  }

  export type HouseholdMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "householdId" | "userId" | "role" | "joinedAt", ExtArgs["result"]["householdMember"]>
  export type HouseholdMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HouseholdMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HouseholdMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $HouseholdMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HouseholdMember"
    objects: {
      household: Prisma.$HouseholdPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      householdId: string
      userId: string
      role: $Enums.HouseholdRole
      joinedAt: Date
    }, ExtArgs["result"]["householdMember"]>
    composites: {}
  }

  type HouseholdMemberGetPayload<S extends boolean | null | undefined | HouseholdMemberDefaultArgs> = $Result.GetResult<Prisma.$HouseholdMemberPayload, S>

  type HouseholdMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HouseholdMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HouseholdMemberCountAggregateInputType | true
    }

  export interface HouseholdMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HouseholdMember'], meta: { name: 'HouseholdMember' } }
    /**
     * Find zero or one HouseholdMember that matches the filter.
     * @param {HouseholdMemberFindUniqueArgs} args - Arguments to find a HouseholdMember
     * @example
     * // Get one HouseholdMember
     * const householdMember = await prisma.householdMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HouseholdMemberFindUniqueArgs>(args: SelectSubset<T, HouseholdMemberFindUniqueArgs<ExtArgs>>): Prisma__HouseholdMemberClient<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HouseholdMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HouseholdMemberFindUniqueOrThrowArgs} args - Arguments to find a HouseholdMember
     * @example
     * // Get one HouseholdMember
     * const householdMember = await prisma.householdMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HouseholdMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, HouseholdMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HouseholdMemberClient<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HouseholdMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMemberFindFirstArgs} args - Arguments to find a HouseholdMember
     * @example
     * // Get one HouseholdMember
     * const householdMember = await prisma.householdMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HouseholdMemberFindFirstArgs>(args?: SelectSubset<T, HouseholdMemberFindFirstArgs<ExtArgs>>): Prisma__HouseholdMemberClient<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HouseholdMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMemberFindFirstOrThrowArgs} args - Arguments to find a HouseholdMember
     * @example
     * // Get one HouseholdMember
     * const householdMember = await prisma.householdMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HouseholdMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, HouseholdMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__HouseholdMemberClient<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HouseholdMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HouseholdMembers
     * const householdMembers = await prisma.householdMember.findMany()
     * 
     * // Get first 10 HouseholdMembers
     * const householdMembers = await prisma.householdMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const householdMemberWithIdOnly = await prisma.householdMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HouseholdMemberFindManyArgs>(args?: SelectSubset<T, HouseholdMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HouseholdMember.
     * @param {HouseholdMemberCreateArgs} args - Arguments to create a HouseholdMember.
     * @example
     * // Create one HouseholdMember
     * const HouseholdMember = await prisma.householdMember.create({
     *   data: {
     *     // ... data to create a HouseholdMember
     *   }
     * })
     * 
     */
    create<T extends HouseholdMemberCreateArgs>(args: SelectSubset<T, HouseholdMemberCreateArgs<ExtArgs>>): Prisma__HouseholdMemberClient<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HouseholdMembers.
     * @param {HouseholdMemberCreateManyArgs} args - Arguments to create many HouseholdMembers.
     * @example
     * // Create many HouseholdMembers
     * const householdMember = await prisma.householdMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HouseholdMemberCreateManyArgs>(args?: SelectSubset<T, HouseholdMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HouseholdMembers and returns the data saved in the database.
     * @param {HouseholdMemberCreateManyAndReturnArgs} args - Arguments to create many HouseholdMembers.
     * @example
     * // Create many HouseholdMembers
     * const householdMember = await prisma.householdMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HouseholdMembers and only return the `id`
     * const householdMemberWithIdOnly = await prisma.householdMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HouseholdMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, HouseholdMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HouseholdMember.
     * @param {HouseholdMemberDeleteArgs} args - Arguments to delete one HouseholdMember.
     * @example
     * // Delete one HouseholdMember
     * const HouseholdMember = await prisma.householdMember.delete({
     *   where: {
     *     // ... filter to delete one HouseholdMember
     *   }
     * })
     * 
     */
    delete<T extends HouseholdMemberDeleteArgs>(args: SelectSubset<T, HouseholdMemberDeleteArgs<ExtArgs>>): Prisma__HouseholdMemberClient<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HouseholdMember.
     * @param {HouseholdMemberUpdateArgs} args - Arguments to update one HouseholdMember.
     * @example
     * // Update one HouseholdMember
     * const householdMember = await prisma.householdMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HouseholdMemberUpdateArgs>(args: SelectSubset<T, HouseholdMemberUpdateArgs<ExtArgs>>): Prisma__HouseholdMemberClient<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HouseholdMembers.
     * @param {HouseholdMemberDeleteManyArgs} args - Arguments to filter HouseholdMembers to delete.
     * @example
     * // Delete a few HouseholdMembers
     * const { count } = await prisma.householdMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HouseholdMemberDeleteManyArgs>(args?: SelectSubset<T, HouseholdMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HouseholdMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HouseholdMembers
     * const householdMember = await prisma.householdMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HouseholdMemberUpdateManyArgs>(args: SelectSubset<T, HouseholdMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HouseholdMembers and returns the data updated in the database.
     * @param {HouseholdMemberUpdateManyAndReturnArgs} args - Arguments to update many HouseholdMembers.
     * @example
     * // Update many HouseholdMembers
     * const householdMember = await prisma.householdMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HouseholdMembers and only return the `id`
     * const householdMemberWithIdOnly = await prisma.householdMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HouseholdMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, HouseholdMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HouseholdMember.
     * @param {HouseholdMemberUpsertArgs} args - Arguments to update or create a HouseholdMember.
     * @example
     * // Update or create a HouseholdMember
     * const householdMember = await prisma.householdMember.upsert({
     *   create: {
     *     // ... data to create a HouseholdMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HouseholdMember we want to update
     *   }
     * })
     */
    upsert<T extends HouseholdMemberUpsertArgs>(args: SelectSubset<T, HouseholdMemberUpsertArgs<ExtArgs>>): Prisma__HouseholdMemberClient<$Result.GetResult<Prisma.$HouseholdMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HouseholdMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMemberCountArgs} args - Arguments to filter HouseholdMembers to count.
     * @example
     * // Count the number of HouseholdMembers
     * const count = await prisma.householdMember.count({
     *   where: {
     *     // ... the filter for the HouseholdMembers we want to count
     *   }
     * })
    **/
    count<T extends HouseholdMemberCountArgs>(
      args?: Subset<T, HouseholdMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HouseholdMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HouseholdMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HouseholdMemberAggregateArgs>(args: Subset<T, HouseholdMemberAggregateArgs>): Prisma.PrismaPromise<GetHouseholdMemberAggregateType<T>>

    /**
     * Group by HouseholdMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HouseholdMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HouseholdMemberGroupByArgs['orderBy'] }
        : { orderBy?: HouseholdMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HouseholdMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHouseholdMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HouseholdMember model
   */
  readonly fields: HouseholdMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HouseholdMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HouseholdMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    household<T extends HouseholdDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HouseholdDefaultArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HouseholdMember model
   */
  interface HouseholdMemberFieldRefs {
    readonly id: FieldRef<"HouseholdMember", 'String'>
    readonly householdId: FieldRef<"HouseholdMember", 'String'>
    readonly userId: FieldRef<"HouseholdMember", 'String'>
    readonly role: FieldRef<"HouseholdMember", 'HouseholdRole'>
    readonly joinedAt: FieldRef<"HouseholdMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HouseholdMember findUnique
   */
  export type HouseholdMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdMember to fetch.
     */
    where: HouseholdMemberWhereUniqueInput
  }

  /**
   * HouseholdMember findUniqueOrThrow
   */
  export type HouseholdMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdMember to fetch.
     */
    where: HouseholdMemberWhereUniqueInput
  }

  /**
   * HouseholdMember findFirst
   */
  export type HouseholdMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdMember to fetch.
     */
    where?: HouseholdMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdMembers to fetch.
     */
    orderBy?: HouseholdMemberOrderByWithRelationInput | HouseholdMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HouseholdMembers.
     */
    cursor?: HouseholdMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HouseholdMembers.
     */
    distinct?: HouseholdMemberScalarFieldEnum | HouseholdMemberScalarFieldEnum[]
  }

  /**
   * HouseholdMember findFirstOrThrow
   */
  export type HouseholdMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdMember to fetch.
     */
    where?: HouseholdMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdMembers to fetch.
     */
    orderBy?: HouseholdMemberOrderByWithRelationInput | HouseholdMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HouseholdMembers.
     */
    cursor?: HouseholdMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HouseholdMembers.
     */
    distinct?: HouseholdMemberScalarFieldEnum | HouseholdMemberScalarFieldEnum[]
  }

  /**
   * HouseholdMember findMany
   */
  export type HouseholdMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdMembers to fetch.
     */
    where?: HouseholdMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdMembers to fetch.
     */
    orderBy?: HouseholdMemberOrderByWithRelationInput | HouseholdMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HouseholdMembers.
     */
    cursor?: HouseholdMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HouseholdMembers.
     */
    distinct?: HouseholdMemberScalarFieldEnum | HouseholdMemberScalarFieldEnum[]
  }

  /**
   * HouseholdMember create
   */
  export type HouseholdMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a HouseholdMember.
     */
    data: XOR<HouseholdMemberCreateInput, HouseholdMemberUncheckedCreateInput>
  }

  /**
   * HouseholdMember createMany
   */
  export type HouseholdMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HouseholdMembers.
     */
    data: HouseholdMemberCreateManyInput | HouseholdMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HouseholdMember createManyAndReturn
   */
  export type HouseholdMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * The data used to create many HouseholdMembers.
     */
    data: HouseholdMemberCreateManyInput | HouseholdMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HouseholdMember update
   */
  export type HouseholdMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a HouseholdMember.
     */
    data: XOR<HouseholdMemberUpdateInput, HouseholdMemberUncheckedUpdateInput>
    /**
     * Choose, which HouseholdMember to update.
     */
    where: HouseholdMemberWhereUniqueInput
  }

  /**
   * HouseholdMember updateMany
   */
  export type HouseholdMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HouseholdMembers.
     */
    data: XOR<HouseholdMemberUpdateManyMutationInput, HouseholdMemberUncheckedUpdateManyInput>
    /**
     * Filter which HouseholdMembers to update
     */
    where?: HouseholdMemberWhereInput
    /**
     * Limit how many HouseholdMembers to update.
     */
    limit?: number
  }

  /**
   * HouseholdMember updateManyAndReturn
   */
  export type HouseholdMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * The data used to update HouseholdMembers.
     */
    data: XOR<HouseholdMemberUpdateManyMutationInput, HouseholdMemberUncheckedUpdateManyInput>
    /**
     * Filter which HouseholdMembers to update
     */
    where?: HouseholdMemberWhereInput
    /**
     * Limit how many HouseholdMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HouseholdMember upsert
   */
  export type HouseholdMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the HouseholdMember to update in case it exists.
     */
    where: HouseholdMemberWhereUniqueInput
    /**
     * In case the HouseholdMember found by the `where` argument doesn't exist, create a new HouseholdMember with this data.
     */
    create: XOR<HouseholdMemberCreateInput, HouseholdMemberUncheckedCreateInput>
    /**
     * In case the HouseholdMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HouseholdMemberUpdateInput, HouseholdMemberUncheckedUpdateInput>
  }

  /**
   * HouseholdMember delete
   */
  export type HouseholdMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
    /**
     * Filter which HouseholdMember to delete.
     */
    where: HouseholdMemberWhereUniqueInput
  }

  /**
   * HouseholdMember deleteMany
   */
  export type HouseholdMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HouseholdMembers to delete
     */
    where?: HouseholdMemberWhereInput
    /**
     * Limit how many HouseholdMembers to delete.
     */
    limit?: number
  }

  /**
   * HouseholdMember without action
   */
  export type HouseholdMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdMember
     */
    select?: HouseholdMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdMember
     */
    omit?: HouseholdMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdMemberInclude<ExtArgs> | null
  }


  /**
   * Model HouseholdInvite
   */

  export type AggregateHouseholdInvite = {
    _count: HouseholdInviteCountAggregateOutputType | null
    _min: HouseholdInviteMinAggregateOutputType | null
    _max: HouseholdInviteMaxAggregateOutputType | null
  }

  export type HouseholdInviteMinAggregateOutputType = {
    id: string | null
    householdId: string | null
    code: string | null
    expiresAt: Date | null
    usedAt: Date | null
    usedByUserId: string | null
    createdAt: Date | null
  }

  export type HouseholdInviteMaxAggregateOutputType = {
    id: string | null
    householdId: string | null
    code: string | null
    expiresAt: Date | null
    usedAt: Date | null
    usedByUserId: string | null
    createdAt: Date | null
  }

  export type HouseholdInviteCountAggregateOutputType = {
    id: number
    householdId: number
    code: number
    expiresAt: number
    usedAt: number
    usedByUserId: number
    createdAt: number
    _all: number
  }


  export type HouseholdInviteMinAggregateInputType = {
    id?: true
    householdId?: true
    code?: true
    expiresAt?: true
    usedAt?: true
    usedByUserId?: true
    createdAt?: true
  }

  export type HouseholdInviteMaxAggregateInputType = {
    id?: true
    householdId?: true
    code?: true
    expiresAt?: true
    usedAt?: true
    usedByUserId?: true
    createdAt?: true
  }

  export type HouseholdInviteCountAggregateInputType = {
    id?: true
    householdId?: true
    code?: true
    expiresAt?: true
    usedAt?: true
    usedByUserId?: true
    createdAt?: true
    _all?: true
  }

  export type HouseholdInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HouseholdInvite to aggregate.
     */
    where?: HouseholdInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdInvites to fetch.
     */
    orderBy?: HouseholdInviteOrderByWithRelationInput | HouseholdInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HouseholdInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HouseholdInvites
    **/
    _count?: true | HouseholdInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HouseholdInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HouseholdInviteMaxAggregateInputType
  }

  export type GetHouseholdInviteAggregateType<T extends HouseholdInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateHouseholdInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHouseholdInvite[P]>
      : GetScalarType<T[P], AggregateHouseholdInvite[P]>
  }




  export type HouseholdInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HouseholdInviteWhereInput
    orderBy?: HouseholdInviteOrderByWithAggregationInput | HouseholdInviteOrderByWithAggregationInput[]
    by: HouseholdInviteScalarFieldEnum[] | HouseholdInviteScalarFieldEnum
    having?: HouseholdInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HouseholdInviteCountAggregateInputType | true
    _min?: HouseholdInviteMinAggregateInputType
    _max?: HouseholdInviteMaxAggregateInputType
  }

  export type HouseholdInviteGroupByOutputType = {
    id: string
    householdId: string
    code: string
    expiresAt: Date
    usedAt: Date | null
    usedByUserId: string | null
    createdAt: Date
    _count: HouseholdInviteCountAggregateOutputType | null
    _min: HouseholdInviteMinAggregateOutputType | null
    _max: HouseholdInviteMaxAggregateOutputType | null
  }

  type GetHouseholdInviteGroupByPayload<T extends HouseholdInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HouseholdInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HouseholdInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HouseholdInviteGroupByOutputType[P]>
            : GetScalarType<T[P], HouseholdInviteGroupByOutputType[P]>
        }
      >
    >


  export type HouseholdInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    usedByUserId?: boolean
    createdAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["householdInvite"]>

  export type HouseholdInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    usedByUserId?: boolean
    createdAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["householdInvite"]>

  export type HouseholdInviteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    usedByUserId?: boolean
    createdAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["householdInvite"]>

  export type HouseholdInviteSelectScalar = {
    id?: boolean
    householdId?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    usedByUserId?: boolean
    createdAt?: boolean
  }

  export type HouseholdInviteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "householdId" | "code" | "expiresAt" | "usedAt" | "usedByUserId" | "createdAt", ExtArgs["result"]["householdInvite"]>
  export type HouseholdInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }
  export type HouseholdInviteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }
  export type HouseholdInviteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }

  export type $HouseholdInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HouseholdInvite"
    objects: {
      household: Prisma.$HouseholdPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      householdId: string
      code: string
      expiresAt: Date
      usedAt: Date | null
      usedByUserId: string | null
      createdAt: Date
    }, ExtArgs["result"]["householdInvite"]>
    composites: {}
  }

  type HouseholdInviteGetPayload<S extends boolean | null | undefined | HouseholdInviteDefaultArgs> = $Result.GetResult<Prisma.$HouseholdInvitePayload, S>

  type HouseholdInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HouseholdInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HouseholdInviteCountAggregateInputType | true
    }

  export interface HouseholdInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HouseholdInvite'], meta: { name: 'HouseholdInvite' } }
    /**
     * Find zero or one HouseholdInvite that matches the filter.
     * @param {HouseholdInviteFindUniqueArgs} args - Arguments to find a HouseholdInvite
     * @example
     * // Get one HouseholdInvite
     * const householdInvite = await prisma.householdInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HouseholdInviteFindUniqueArgs>(args: SelectSubset<T, HouseholdInviteFindUniqueArgs<ExtArgs>>): Prisma__HouseholdInviteClient<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HouseholdInvite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HouseholdInviteFindUniqueOrThrowArgs} args - Arguments to find a HouseholdInvite
     * @example
     * // Get one HouseholdInvite
     * const householdInvite = await prisma.householdInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HouseholdInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, HouseholdInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HouseholdInviteClient<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HouseholdInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdInviteFindFirstArgs} args - Arguments to find a HouseholdInvite
     * @example
     * // Get one HouseholdInvite
     * const householdInvite = await prisma.householdInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HouseholdInviteFindFirstArgs>(args?: SelectSubset<T, HouseholdInviteFindFirstArgs<ExtArgs>>): Prisma__HouseholdInviteClient<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HouseholdInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdInviteFindFirstOrThrowArgs} args - Arguments to find a HouseholdInvite
     * @example
     * // Get one HouseholdInvite
     * const householdInvite = await prisma.householdInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HouseholdInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, HouseholdInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__HouseholdInviteClient<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HouseholdInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HouseholdInvites
     * const householdInvites = await prisma.householdInvite.findMany()
     * 
     * // Get first 10 HouseholdInvites
     * const householdInvites = await prisma.householdInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const householdInviteWithIdOnly = await prisma.householdInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HouseholdInviteFindManyArgs>(args?: SelectSubset<T, HouseholdInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HouseholdInvite.
     * @param {HouseholdInviteCreateArgs} args - Arguments to create a HouseholdInvite.
     * @example
     * // Create one HouseholdInvite
     * const HouseholdInvite = await prisma.householdInvite.create({
     *   data: {
     *     // ... data to create a HouseholdInvite
     *   }
     * })
     * 
     */
    create<T extends HouseholdInviteCreateArgs>(args: SelectSubset<T, HouseholdInviteCreateArgs<ExtArgs>>): Prisma__HouseholdInviteClient<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HouseholdInvites.
     * @param {HouseholdInviteCreateManyArgs} args - Arguments to create many HouseholdInvites.
     * @example
     * // Create many HouseholdInvites
     * const householdInvite = await prisma.householdInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HouseholdInviteCreateManyArgs>(args?: SelectSubset<T, HouseholdInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HouseholdInvites and returns the data saved in the database.
     * @param {HouseholdInviteCreateManyAndReturnArgs} args - Arguments to create many HouseholdInvites.
     * @example
     * // Create many HouseholdInvites
     * const householdInvite = await prisma.householdInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HouseholdInvites and only return the `id`
     * const householdInviteWithIdOnly = await prisma.householdInvite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HouseholdInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, HouseholdInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HouseholdInvite.
     * @param {HouseholdInviteDeleteArgs} args - Arguments to delete one HouseholdInvite.
     * @example
     * // Delete one HouseholdInvite
     * const HouseholdInvite = await prisma.householdInvite.delete({
     *   where: {
     *     // ... filter to delete one HouseholdInvite
     *   }
     * })
     * 
     */
    delete<T extends HouseholdInviteDeleteArgs>(args: SelectSubset<T, HouseholdInviteDeleteArgs<ExtArgs>>): Prisma__HouseholdInviteClient<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HouseholdInvite.
     * @param {HouseholdInviteUpdateArgs} args - Arguments to update one HouseholdInvite.
     * @example
     * // Update one HouseholdInvite
     * const householdInvite = await prisma.householdInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HouseholdInviteUpdateArgs>(args: SelectSubset<T, HouseholdInviteUpdateArgs<ExtArgs>>): Prisma__HouseholdInviteClient<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HouseholdInvites.
     * @param {HouseholdInviteDeleteManyArgs} args - Arguments to filter HouseholdInvites to delete.
     * @example
     * // Delete a few HouseholdInvites
     * const { count } = await prisma.householdInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HouseholdInviteDeleteManyArgs>(args?: SelectSubset<T, HouseholdInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HouseholdInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HouseholdInvites
     * const householdInvite = await prisma.householdInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HouseholdInviteUpdateManyArgs>(args: SelectSubset<T, HouseholdInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HouseholdInvites and returns the data updated in the database.
     * @param {HouseholdInviteUpdateManyAndReturnArgs} args - Arguments to update many HouseholdInvites.
     * @example
     * // Update many HouseholdInvites
     * const householdInvite = await prisma.householdInvite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HouseholdInvites and only return the `id`
     * const householdInviteWithIdOnly = await prisma.householdInvite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HouseholdInviteUpdateManyAndReturnArgs>(args: SelectSubset<T, HouseholdInviteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HouseholdInvite.
     * @param {HouseholdInviteUpsertArgs} args - Arguments to update or create a HouseholdInvite.
     * @example
     * // Update or create a HouseholdInvite
     * const householdInvite = await prisma.householdInvite.upsert({
     *   create: {
     *     // ... data to create a HouseholdInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HouseholdInvite we want to update
     *   }
     * })
     */
    upsert<T extends HouseholdInviteUpsertArgs>(args: SelectSubset<T, HouseholdInviteUpsertArgs<ExtArgs>>): Prisma__HouseholdInviteClient<$Result.GetResult<Prisma.$HouseholdInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HouseholdInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdInviteCountArgs} args - Arguments to filter HouseholdInvites to count.
     * @example
     * // Count the number of HouseholdInvites
     * const count = await prisma.householdInvite.count({
     *   where: {
     *     // ... the filter for the HouseholdInvites we want to count
     *   }
     * })
    **/
    count<T extends HouseholdInviteCountArgs>(
      args?: Subset<T, HouseholdInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HouseholdInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HouseholdInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HouseholdInviteAggregateArgs>(args: Subset<T, HouseholdInviteAggregateArgs>): Prisma.PrismaPromise<GetHouseholdInviteAggregateType<T>>

    /**
     * Group by HouseholdInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HouseholdInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HouseholdInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HouseholdInviteGroupByArgs['orderBy'] }
        : { orderBy?: HouseholdInviteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HouseholdInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHouseholdInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HouseholdInvite model
   */
  readonly fields: HouseholdInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HouseholdInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HouseholdInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    household<T extends HouseholdDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HouseholdDefaultArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HouseholdInvite model
   */
  interface HouseholdInviteFieldRefs {
    readonly id: FieldRef<"HouseholdInvite", 'String'>
    readonly householdId: FieldRef<"HouseholdInvite", 'String'>
    readonly code: FieldRef<"HouseholdInvite", 'String'>
    readonly expiresAt: FieldRef<"HouseholdInvite", 'DateTime'>
    readonly usedAt: FieldRef<"HouseholdInvite", 'DateTime'>
    readonly usedByUserId: FieldRef<"HouseholdInvite", 'String'>
    readonly createdAt: FieldRef<"HouseholdInvite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HouseholdInvite findUnique
   */
  export type HouseholdInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdInvite to fetch.
     */
    where: HouseholdInviteWhereUniqueInput
  }

  /**
   * HouseholdInvite findUniqueOrThrow
   */
  export type HouseholdInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdInvite to fetch.
     */
    where: HouseholdInviteWhereUniqueInput
  }

  /**
   * HouseholdInvite findFirst
   */
  export type HouseholdInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdInvite to fetch.
     */
    where?: HouseholdInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdInvites to fetch.
     */
    orderBy?: HouseholdInviteOrderByWithRelationInput | HouseholdInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HouseholdInvites.
     */
    cursor?: HouseholdInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HouseholdInvites.
     */
    distinct?: HouseholdInviteScalarFieldEnum | HouseholdInviteScalarFieldEnum[]
  }

  /**
   * HouseholdInvite findFirstOrThrow
   */
  export type HouseholdInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdInvite to fetch.
     */
    where?: HouseholdInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdInvites to fetch.
     */
    orderBy?: HouseholdInviteOrderByWithRelationInput | HouseholdInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HouseholdInvites.
     */
    cursor?: HouseholdInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HouseholdInvites.
     */
    distinct?: HouseholdInviteScalarFieldEnum | HouseholdInviteScalarFieldEnum[]
  }

  /**
   * HouseholdInvite findMany
   */
  export type HouseholdInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
    /**
     * Filter, which HouseholdInvites to fetch.
     */
    where?: HouseholdInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HouseholdInvites to fetch.
     */
    orderBy?: HouseholdInviteOrderByWithRelationInput | HouseholdInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HouseholdInvites.
     */
    cursor?: HouseholdInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HouseholdInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HouseholdInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HouseholdInvites.
     */
    distinct?: HouseholdInviteScalarFieldEnum | HouseholdInviteScalarFieldEnum[]
  }

  /**
   * HouseholdInvite create
   */
  export type HouseholdInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a HouseholdInvite.
     */
    data: XOR<HouseholdInviteCreateInput, HouseholdInviteUncheckedCreateInput>
  }

  /**
   * HouseholdInvite createMany
   */
  export type HouseholdInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HouseholdInvites.
     */
    data: HouseholdInviteCreateManyInput | HouseholdInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HouseholdInvite createManyAndReturn
   */
  export type HouseholdInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * The data used to create many HouseholdInvites.
     */
    data: HouseholdInviteCreateManyInput | HouseholdInviteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HouseholdInvite update
   */
  export type HouseholdInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a HouseholdInvite.
     */
    data: XOR<HouseholdInviteUpdateInput, HouseholdInviteUncheckedUpdateInput>
    /**
     * Choose, which HouseholdInvite to update.
     */
    where: HouseholdInviteWhereUniqueInput
  }

  /**
   * HouseholdInvite updateMany
   */
  export type HouseholdInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HouseholdInvites.
     */
    data: XOR<HouseholdInviteUpdateManyMutationInput, HouseholdInviteUncheckedUpdateManyInput>
    /**
     * Filter which HouseholdInvites to update
     */
    where?: HouseholdInviteWhereInput
    /**
     * Limit how many HouseholdInvites to update.
     */
    limit?: number
  }

  /**
   * HouseholdInvite updateManyAndReturn
   */
  export type HouseholdInviteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * The data used to update HouseholdInvites.
     */
    data: XOR<HouseholdInviteUpdateManyMutationInput, HouseholdInviteUncheckedUpdateManyInput>
    /**
     * Filter which HouseholdInvites to update
     */
    where?: HouseholdInviteWhereInput
    /**
     * Limit how many HouseholdInvites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HouseholdInvite upsert
   */
  export type HouseholdInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the HouseholdInvite to update in case it exists.
     */
    where: HouseholdInviteWhereUniqueInput
    /**
     * In case the HouseholdInvite found by the `where` argument doesn't exist, create a new HouseholdInvite with this data.
     */
    create: XOR<HouseholdInviteCreateInput, HouseholdInviteUncheckedCreateInput>
    /**
     * In case the HouseholdInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HouseholdInviteUpdateInput, HouseholdInviteUncheckedUpdateInput>
  }

  /**
   * HouseholdInvite delete
   */
  export type HouseholdInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
    /**
     * Filter which HouseholdInvite to delete.
     */
    where: HouseholdInviteWhereUniqueInput
  }

  /**
   * HouseholdInvite deleteMany
   */
  export type HouseholdInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HouseholdInvites to delete
     */
    where?: HouseholdInviteWhereInput
    /**
     * Limit how many HouseholdInvites to delete.
     */
    limit?: number
  }

  /**
   * HouseholdInvite without action
   */
  export type HouseholdInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HouseholdInvite
     */
    select?: HouseholdInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HouseholdInvite
     */
    omit?: HouseholdInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HouseholdInviteInclude<ExtArgs> | null
  }


  /**
   * Model Freezer
   */

  export type AggregateFreezer = {
    _count: FreezerCountAggregateOutputType | null
    _min: FreezerMinAggregateOutputType | null
    _max: FreezerMaxAggregateOutputType | null
  }

  export type FreezerMinAggregateOutputType = {
    id: string | null
    householdId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
  }

  export type FreezerMaxAggregateOutputType = {
    id: string | null
    householdId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
  }

  export type FreezerCountAggregateOutputType = {
    id: number
    householdId: number
    name: number
    description: number
    createdAt: number
    _all: number
  }


  export type FreezerMinAggregateInputType = {
    id?: true
    householdId?: true
    name?: true
    description?: true
    createdAt?: true
  }

  export type FreezerMaxAggregateInputType = {
    id?: true
    householdId?: true
    name?: true
    description?: true
    createdAt?: true
  }

  export type FreezerCountAggregateInputType = {
    id?: true
    householdId?: true
    name?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type FreezerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Freezer to aggregate.
     */
    where?: FreezerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Freezers to fetch.
     */
    orderBy?: FreezerOrderByWithRelationInput | FreezerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FreezerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Freezers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Freezers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Freezers
    **/
    _count?: true | FreezerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FreezerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FreezerMaxAggregateInputType
  }

  export type GetFreezerAggregateType<T extends FreezerAggregateArgs> = {
        [P in keyof T & keyof AggregateFreezer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFreezer[P]>
      : GetScalarType<T[P], AggregateFreezer[P]>
  }




  export type FreezerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FreezerWhereInput
    orderBy?: FreezerOrderByWithAggregationInput | FreezerOrderByWithAggregationInput[]
    by: FreezerScalarFieldEnum[] | FreezerScalarFieldEnum
    having?: FreezerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FreezerCountAggregateInputType | true
    _min?: FreezerMinAggregateInputType
    _max?: FreezerMaxAggregateInputType
  }

  export type FreezerGroupByOutputType = {
    id: string
    householdId: string
    name: string
    description: string | null
    createdAt: Date
    _count: FreezerCountAggregateOutputType | null
    _min: FreezerMinAggregateOutputType | null
    _max: FreezerMaxAggregateOutputType | null
  }

  type GetFreezerGroupByPayload<T extends FreezerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FreezerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FreezerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FreezerGroupByOutputType[P]>
            : GetScalarType<T[P], FreezerGroupByOutputType[P]>
        }
      >
    >


  export type FreezerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    compartments?: boolean | Freezer$compartmentsArgs<ExtArgs>
    items?: boolean | Freezer$itemsArgs<ExtArgs>
    _count?: boolean | FreezerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["freezer"]>

  export type FreezerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["freezer"]>

  export type FreezerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["freezer"]>

  export type FreezerSelectScalar = {
    id?: boolean
    householdId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type FreezerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "householdId" | "name" | "description" | "createdAt", ExtArgs["result"]["freezer"]>
  export type FreezerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    compartments?: boolean | Freezer$compartmentsArgs<ExtArgs>
    items?: boolean | Freezer$itemsArgs<ExtArgs>
    _count?: boolean | FreezerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FreezerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }
  export type FreezerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
  }

  export type $FreezerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Freezer"
    objects: {
      household: Prisma.$HouseholdPayload<ExtArgs>
      compartments: Prisma.$CompartmentPayload<ExtArgs>[]
      items: Prisma.$FreezerItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      householdId: string
      name: string
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["freezer"]>
    composites: {}
  }

  type FreezerGetPayload<S extends boolean | null | undefined | FreezerDefaultArgs> = $Result.GetResult<Prisma.$FreezerPayload, S>

  type FreezerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FreezerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FreezerCountAggregateInputType | true
    }

  export interface FreezerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Freezer'], meta: { name: 'Freezer' } }
    /**
     * Find zero or one Freezer that matches the filter.
     * @param {FreezerFindUniqueArgs} args - Arguments to find a Freezer
     * @example
     * // Get one Freezer
     * const freezer = await prisma.freezer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FreezerFindUniqueArgs>(args: SelectSubset<T, FreezerFindUniqueArgs<ExtArgs>>): Prisma__FreezerClient<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Freezer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FreezerFindUniqueOrThrowArgs} args - Arguments to find a Freezer
     * @example
     * // Get one Freezer
     * const freezer = await prisma.freezer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FreezerFindUniqueOrThrowArgs>(args: SelectSubset<T, FreezerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FreezerClient<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Freezer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerFindFirstArgs} args - Arguments to find a Freezer
     * @example
     * // Get one Freezer
     * const freezer = await prisma.freezer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FreezerFindFirstArgs>(args?: SelectSubset<T, FreezerFindFirstArgs<ExtArgs>>): Prisma__FreezerClient<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Freezer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerFindFirstOrThrowArgs} args - Arguments to find a Freezer
     * @example
     * // Get one Freezer
     * const freezer = await prisma.freezer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FreezerFindFirstOrThrowArgs>(args?: SelectSubset<T, FreezerFindFirstOrThrowArgs<ExtArgs>>): Prisma__FreezerClient<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Freezers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Freezers
     * const freezers = await prisma.freezer.findMany()
     * 
     * // Get first 10 Freezers
     * const freezers = await prisma.freezer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const freezerWithIdOnly = await prisma.freezer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FreezerFindManyArgs>(args?: SelectSubset<T, FreezerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Freezer.
     * @param {FreezerCreateArgs} args - Arguments to create a Freezer.
     * @example
     * // Create one Freezer
     * const Freezer = await prisma.freezer.create({
     *   data: {
     *     // ... data to create a Freezer
     *   }
     * })
     * 
     */
    create<T extends FreezerCreateArgs>(args: SelectSubset<T, FreezerCreateArgs<ExtArgs>>): Prisma__FreezerClient<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Freezers.
     * @param {FreezerCreateManyArgs} args - Arguments to create many Freezers.
     * @example
     * // Create many Freezers
     * const freezer = await prisma.freezer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FreezerCreateManyArgs>(args?: SelectSubset<T, FreezerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Freezers and returns the data saved in the database.
     * @param {FreezerCreateManyAndReturnArgs} args - Arguments to create many Freezers.
     * @example
     * // Create many Freezers
     * const freezer = await prisma.freezer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Freezers and only return the `id`
     * const freezerWithIdOnly = await prisma.freezer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FreezerCreateManyAndReturnArgs>(args?: SelectSubset<T, FreezerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Freezer.
     * @param {FreezerDeleteArgs} args - Arguments to delete one Freezer.
     * @example
     * // Delete one Freezer
     * const Freezer = await prisma.freezer.delete({
     *   where: {
     *     // ... filter to delete one Freezer
     *   }
     * })
     * 
     */
    delete<T extends FreezerDeleteArgs>(args: SelectSubset<T, FreezerDeleteArgs<ExtArgs>>): Prisma__FreezerClient<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Freezer.
     * @param {FreezerUpdateArgs} args - Arguments to update one Freezer.
     * @example
     * // Update one Freezer
     * const freezer = await prisma.freezer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FreezerUpdateArgs>(args: SelectSubset<T, FreezerUpdateArgs<ExtArgs>>): Prisma__FreezerClient<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Freezers.
     * @param {FreezerDeleteManyArgs} args - Arguments to filter Freezers to delete.
     * @example
     * // Delete a few Freezers
     * const { count } = await prisma.freezer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FreezerDeleteManyArgs>(args?: SelectSubset<T, FreezerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Freezers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Freezers
     * const freezer = await prisma.freezer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FreezerUpdateManyArgs>(args: SelectSubset<T, FreezerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Freezers and returns the data updated in the database.
     * @param {FreezerUpdateManyAndReturnArgs} args - Arguments to update many Freezers.
     * @example
     * // Update many Freezers
     * const freezer = await prisma.freezer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Freezers and only return the `id`
     * const freezerWithIdOnly = await prisma.freezer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FreezerUpdateManyAndReturnArgs>(args: SelectSubset<T, FreezerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Freezer.
     * @param {FreezerUpsertArgs} args - Arguments to update or create a Freezer.
     * @example
     * // Update or create a Freezer
     * const freezer = await prisma.freezer.upsert({
     *   create: {
     *     // ... data to create a Freezer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Freezer we want to update
     *   }
     * })
     */
    upsert<T extends FreezerUpsertArgs>(args: SelectSubset<T, FreezerUpsertArgs<ExtArgs>>): Prisma__FreezerClient<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Freezers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerCountArgs} args - Arguments to filter Freezers to count.
     * @example
     * // Count the number of Freezers
     * const count = await prisma.freezer.count({
     *   where: {
     *     // ... the filter for the Freezers we want to count
     *   }
     * })
    **/
    count<T extends FreezerCountArgs>(
      args?: Subset<T, FreezerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FreezerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Freezer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FreezerAggregateArgs>(args: Subset<T, FreezerAggregateArgs>): Prisma.PrismaPromise<GetFreezerAggregateType<T>>

    /**
     * Group by Freezer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FreezerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FreezerGroupByArgs['orderBy'] }
        : { orderBy?: FreezerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FreezerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFreezerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Freezer model
   */
  readonly fields: FreezerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Freezer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FreezerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    household<T extends HouseholdDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HouseholdDefaultArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    compartments<T extends Freezer$compartmentsArgs<ExtArgs> = {}>(args?: Subset<T, Freezer$compartmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    items<T extends Freezer$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Freezer$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Freezer model
   */
  interface FreezerFieldRefs {
    readonly id: FieldRef<"Freezer", 'String'>
    readonly householdId: FieldRef<"Freezer", 'String'>
    readonly name: FieldRef<"Freezer", 'String'>
    readonly description: FieldRef<"Freezer", 'String'>
    readonly createdAt: FieldRef<"Freezer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Freezer findUnique
   */
  export type FreezerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
    /**
     * Filter, which Freezer to fetch.
     */
    where: FreezerWhereUniqueInput
  }

  /**
   * Freezer findUniqueOrThrow
   */
  export type FreezerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
    /**
     * Filter, which Freezer to fetch.
     */
    where: FreezerWhereUniqueInput
  }

  /**
   * Freezer findFirst
   */
  export type FreezerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
    /**
     * Filter, which Freezer to fetch.
     */
    where?: FreezerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Freezers to fetch.
     */
    orderBy?: FreezerOrderByWithRelationInput | FreezerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Freezers.
     */
    cursor?: FreezerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Freezers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Freezers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Freezers.
     */
    distinct?: FreezerScalarFieldEnum | FreezerScalarFieldEnum[]
  }

  /**
   * Freezer findFirstOrThrow
   */
  export type FreezerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
    /**
     * Filter, which Freezer to fetch.
     */
    where?: FreezerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Freezers to fetch.
     */
    orderBy?: FreezerOrderByWithRelationInput | FreezerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Freezers.
     */
    cursor?: FreezerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Freezers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Freezers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Freezers.
     */
    distinct?: FreezerScalarFieldEnum | FreezerScalarFieldEnum[]
  }

  /**
   * Freezer findMany
   */
  export type FreezerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
    /**
     * Filter, which Freezers to fetch.
     */
    where?: FreezerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Freezers to fetch.
     */
    orderBy?: FreezerOrderByWithRelationInput | FreezerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Freezers.
     */
    cursor?: FreezerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Freezers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Freezers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Freezers.
     */
    distinct?: FreezerScalarFieldEnum | FreezerScalarFieldEnum[]
  }

  /**
   * Freezer create
   */
  export type FreezerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
    /**
     * The data needed to create a Freezer.
     */
    data: XOR<FreezerCreateInput, FreezerUncheckedCreateInput>
  }

  /**
   * Freezer createMany
   */
  export type FreezerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Freezers.
     */
    data: FreezerCreateManyInput | FreezerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Freezer createManyAndReturn
   */
  export type FreezerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * The data used to create many Freezers.
     */
    data: FreezerCreateManyInput | FreezerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Freezer update
   */
  export type FreezerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
    /**
     * The data needed to update a Freezer.
     */
    data: XOR<FreezerUpdateInput, FreezerUncheckedUpdateInput>
    /**
     * Choose, which Freezer to update.
     */
    where: FreezerWhereUniqueInput
  }

  /**
   * Freezer updateMany
   */
  export type FreezerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Freezers.
     */
    data: XOR<FreezerUpdateManyMutationInput, FreezerUncheckedUpdateManyInput>
    /**
     * Filter which Freezers to update
     */
    where?: FreezerWhereInput
    /**
     * Limit how many Freezers to update.
     */
    limit?: number
  }

  /**
   * Freezer updateManyAndReturn
   */
  export type FreezerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * The data used to update Freezers.
     */
    data: XOR<FreezerUpdateManyMutationInput, FreezerUncheckedUpdateManyInput>
    /**
     * Filter which Freezers to update
     */
    where?: FreezerWhereInput
    /**
     * Limit how many Freezers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Freezer upsert
   */
  export type FreezerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
    /**
     * The filter to search for the Freezer to update in case it exists.
     */
    where: FreezerWhereUniqueInput
    /**
     * In case the Freezer found by the `where` argument doesn't exist, create a new Freezer with this data.
     */
    create: XOR<FreezerCreateInput, FreezerUncheckedCreateInput>
    /**
     * In case the Freezer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FreezerUpdateInput, FreezerUncheckedUpdateInput>
  }

  /**
   * Freezer delete
   */
  export type FreezerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
    /**
     * Filter which Freezer to delete.
     */
    where: FreezerWhereUniqueInput
  }

  /**
   * Freezer deleteMany
   */
  export type FreezerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Freezers to delete
     */
    where?: FreezerWhereInput
    /**
     * Limit how many Freezers to delete.
     */
    limit?: number
  }

  /**
   * Freezer.compartments
   */
  export type Freezer$compartmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
    where?: CompartmentWhereInput
    orderBy?: CompartmentOrderByWithRelationInput | CompartmentOrderByWithRelationInput[]
    cursor?: CompartmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompartmentScalarFieldEnum | CompartmentScalarFieldEnum[]
  }

  /**
   * Freezer.items
   */
  export type Freezer$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    where?: FreezerItemWhereInput
    orderBy?: FreezerItemOrderByWithRelationInput | FreezerItemOrderByWithRelationInput[]
    cursor?: FreezerItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FreezerItemScalarFieldEnum | FreezerItemScalarFieldEnum[]
  }

  /**
   * Freezer without action
   */
  export type FreezerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Freezer
     */
    select?: FreezerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Freezer
     */
    omit?: FreezerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerInclude<ExtArgs> | null
  }


  /**
   * Model Compartment
   */

  export type AggregateCompartment = {
    _count: CompartmentCountAggregateOutputType | null
    _avg: CompartmentAvgAggregateOutputType | null
    _sum: CompartmentSumAggregateOutputType | null
    _min: CompartmentMinAggregateOutputType | null
    _max: CompartmentMaxAggregateOutputType | null
  }

  export type CompartmentAvgAggregateOutputType = {
    position: number | null
  }

  export type CompartmentSumAggregateOutputType = {
    position: number | null
  }

  export type CompartmentMinAggregateOutputType = {
    id: string | null
    freezerId: string | null
    name: string | null
    position: number | null
  }

  export type CompartmentMaxAggregateOutputType = {
    id: string | null
    freezerId: string | null
    name: string | null
    position: number | null
  }

  export type CompartmentCountAggregateOutputType = {
    id: number
    freezerId: number
    name: number
    position: number
    _all: number
  }


  export type CompartmentAvgAggregateInputType = {
    position?: true
  }

  export type CompartmentSumAggregateInputType = {
    position?: true
  }

  export type CompartmentMinAggregateInputType = {
    id?: true
    freezerId?: true
    name?: true
    position?: true
  }

  export type CompartmentMaxAggregateInputType = {
    id?: true
    freezerId?: true
    name?: true
    position?: true
  }

  export type CompartmentCountAggregateInputType = {
    id?: true
    freezerId?: true
    name?: true
    position?: true
    _all?: true
  }

  export type CompartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Compartment to aggregate.
     */
    where?: CompartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Compartments to fetch.
     */
    orderBy?: CompartmentOrderByWithRelationInput | CompartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Compartments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Compartments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Compartments
    **/
    _count?: true | CompartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompartmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompartmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompartmentMaxAggregateInputType
  }

  export type GetCompartmentAggregateType<T extends CompartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateCompartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompartment[P]>
      : GetScalarType<T[P], AggregateCompartment[P]>
  }




  export type CompartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompartmentWhereInput
    orderBy?: CompartmentOrderByWithAggregationInput | CompartmentOrderByWithAggregationInput[]
    by: CompartmentScalarFieldEnum[] | CompartmentScalarFieldEnum
    having?: CompartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompartmentCountAggregateInputType | true
    _avg?: CompartmentAvgAggregateInputType
    _sum?: CompartmentSumAggregateInputType
    _min?: CompartmentMinAggregateInputType
    _max?: CompartmentMaxAggregateInputType
  }

  export type CompartmentGroupByOutputType = {
    id: string
    freezerId: string
    name: string
    position: number
    _count: CompartmentCountAggregateOutputType | null
    _avg: CompartmentAvgAggregateOutputType | null
    _sum: CompartmentSumAggregateOutputType | null
    _min: CompartmentMinAggregateOutputType | null
    _max: CompartmentMaxAggregateOutputType | null
  }

  type GetCompartmentGroupByPayload<T extends CompartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompartmentGroupByOutputType[P]>
            : GetScalarType<T[P], CompartmentGroupByOutputType[P]>
        }
      >
    >


  export type CompartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    freezerId?: boolean
    name?: boolean
    position?: boolean
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
    items?: boolean | Compartment$itemsArgs<ExtArgs>
    _count?: boolean | CompartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["compartment"]>

  export type CompartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    freezerId?: boolean
    name?: boolean
    position?: boolean
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["compartment"]>

  export type CompartmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    freezerId?: boolean
    name?: boolean
    position?: boolean
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["compartment"]>

  export type CompartmentSelectScalar = {
    id?: boolean
    freezerId?: boolean
    name?: boolean
    position?: boolean
  }

  export type CompartmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "freezerId" | "name" | "position", ExtArgs["result"]["compartment"]>
  export type CompartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
    items?: boolean | Compartment$itemsArgs<ExtArgs>
    _count?: boolean | CompartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
  }
  export type CompartmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
  }

  export type $CompartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Compartment"
    objects: {
      freezer: Prisma.$FreezerPayload<ExtArgs>
      items: Prisma.$FreezerItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      freezerId: string
      name: string
      position: number
    }, ExtArgs["result"]["compartment"]>
    composites: {}
  }

  type CompartmentGetPayload<S extends boolean | null | undefined | CompartmentDefaultArgs> = $Result.GetResult<Prisma.$CompartmentPayload, S>

  type CompartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompartmentCountAggregateInputType | true
    }

  export interface CompartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Compartment'], meta: { name: 'Compartment' } }
    /**
     * Find zero or one Compartment that matches the filter.
     * @param {CompartmentFindUniqueArgs} args - Arguments to find a Compartment
     * @example
     * // Get one Compartment
     * const compartment = await prisma.compartment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompartmentFindUniqueArgs>(args: SelectSubset<T, CompartmentFindUniqueArgs<ExtArgs>>): Prisma__CompartmentClient<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Compartment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompartmentFindUniqueOrThrowArgs} args - Arguments to find a Compartment
     * @example
     * // Get one Compartment
     * const compartment = await prisma.compartment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, CompartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompartmentClient<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Compartment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompartmentFindFirstArgs} args - Arguments to find a Compartment
     * @example
     * // Get one Compartment
     * const compartment = await prisma.compartment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompartmentFindFirstArgs>(args?: SelectSubset<T, CompartmentFindFirstArgs<ExtArgs>>): Prisma__CompartmentClient<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Compartment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompartmentFindFirstOrThrowArgs} args - Arguments to find a Compartment
     * @example
     * // Get one Compartment
     * const compartment = await prisma.compartment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, CompartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompartmentClient<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Compartments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Compartments
     * const compartments = await prisma.compartment.findMany()
     * 
     * // Get first 10 Compartments
     * const compartments = await prisma.compartment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const compartmentWithIdOnly = await prisma.compartment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompartmentFindManyArgs>(args?: SelectSubset<T, CompartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Compartment.
     * @param {CompartmentCreateArgs} args - Arguments to create a Compartment.
     * @example
     * // Create one Compartment
     * const Compartment = await prisma.compartment.create({
     *   data: {
     *     // ... data to create a Compartment
     *   }
     * })
     * 
     */
    create<T extends CompartmentCreateArgs>(args: SelectSubset<T, CompartmentCreateArgs<ExtArgs>>): Prisma__CompartmentClient<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Compartments.
     * @param {CompartmentCreateManyArgs} args - Arguments to create many Compartments.
     * @example
     * // Create many Compartments
     * const compartment = await prisma.compartment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompartmentCreateManyArgs>(args?: SelectSubset<T, CompartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Compartments and returns the data saved in the database.
     * @param {CompartmentCreateManyAndReturnArgs} args - Arguments to create many Compartments.
     * @example
     * // Create many Compartments
     * const compartment = await prisma.compartment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Compartments and only return the `id`
     * const compartmentWithIdOnly = await prisma.compartment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, CompartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Compartment.
     * @param {CompartmentDeleteArgs} args - Arguments to delete one Compartment.
     * @example
     * // Delete one Compartment
     * const Compartment = await prisma.compartment.delete({
     *   where: {
     *     // ... filter to delete one Compartment
     *   }
     * })
     * 
     */
    delete<T extends CompartmentDeleteArgs>(args: SelectSubset<T, CompartmentDeleteArgs<ExtArgs>>): Prisma__CompartmentClient<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Compartment.
     * @param {CompartmentUpdateArgs} args - Arguments to update one Compartment.
     * @example
     * // Update one Compartment
     * const compartment = await prisma.compartment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompartmentUpdateArgs>(args: SelectSubset<T, CompartmentUpdateArgs<ExtArgs>>): Prisma__CompartmentClient<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Compartments.
     * @param {CompartmentDeleteManyArgs} args - Arguments to filter Compartments to delete.
     * @example
     * // Delete a few Compartments
     * const { count } = await prisma.compartment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompartmentDeleteManyArgs>(args?: SelectSubset<T, CompartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Compartments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Compartments
     * const compartment = await prisma.compartment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompartmentUpdateManyArgs>(args: SelectSubset<T, CompartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Compartments and returns the data updated in the database.
     * @param {CompartmentUpdateManyAndReturnArgs} args - Arguments to update many Compartments.
     * @example
     * // Update many Compartments
     * const compartment = await prisma.compartment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Compartments and only return the `id`
     * const compartmentWithIdOnly = await prisma.compartment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompartmentUpdateManyAndReturnArgs>(args: SelectSubset<T, CompartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Compartment.
     * @param {CompartmentUpsertArgs} args - Arguments to update or create a Compartment.
     * @example
     * // Update or create a Compartment
     * const compartment = await prisma.compartment.upsert({
     *   create: {
     *     // ... data to create a Compartment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Compartment we want to update
     *   }
     * })
     */
    upsert<T extends CompartmentUpsertArgs>(args: SelectSubset<T, CompartmentUpsertArgs<ExtArgs>>): Prisma__CompartmentClient<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Compartments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompartmentCountArgs} args - Arguments to filter Compartments to count.
     * @example
     * // Count the number of Compartments
     * const count = await prisma.compartment.count({
     *   where: {
     *     // ... the filter for the Compartments we want to count
     *   }
     * })
    **/
    count<T extends CompartmentCountArgs>(
      args?: Subset<T, CompartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Compartment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompartmentAggregateArgs>(args: Subset<T, CompartmentAggregateArgs>): Prisma.PrismaPromise<GetCompartmentAggregateType<T>>

    /**
     * Group by Compartment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompartmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompartmentGroupByArgs['orderBy'] }
        : { orderBy?: CompartmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Compartment model
   */
  readonly fields: CompartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Compartment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    freezer<T extends FreezerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FreezerDefaultArgs<ExtArgs>>): Prisma__FreezerClient<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Compartment$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Compartment$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Compartment model
   */
  interface CompartmentFieldRefs {
    readonly id: FieldRef<"Compartment", 'String'>
    readonly freezerId: FieldRef<"Compartment", 'String'>
    readonly name: FieldRef<"Compartment", 'String'>
    readonly position: FieldRef<"Compartment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Compartment findUnique
   */
  export type CompartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
    /**
     * Filter, which Compartment to fetch.
     */
    where: CompartmentWhereUniqueInput
  }

  /**
   * Compartment findUniqueOrThrow
   */
  export type CompartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
    /**
     * Filter, which Compartment to fetch.
     */
    where: CompartmentWhereUniqueInput
  }

  /**
   * Compartment findFirst
   */
  export type CompartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
    /**
     * Filter, which Compartment to fetch.
     */
    where?: CompartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Compartments to fetch.
     */
    orderBy?: CompartmentOrderByWithRelationInput | CompartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Compartments.
     */
    cursor?: CompartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Compartments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Compartments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Compartments.
     */
    distinct?: CompartmentScalarFieldEnum | CompartmentScalarFieldEnum[]
  }

  /**
   * Compartment findFirstOrThrow
   */
  export type CompartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
    /**
     * Filter, which Compartment to fetch.
     */
    where?: CompartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Compartments to fetch.
     */
    orderBy?: CompartmentOrderByWithRelationInput | CompartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Compartments.
     */
    cursor?: CompartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Compartments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Compartments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Compartments.
     */
    distinct?: CompartmentScalarFieldEnum | CompartmentScalarFieldEnum[]
  }

  /**
   * Compartment findMany
   */
  export type CompartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
    /**
     * Filter, which Compartments to fetch.
     */
    where?: CompartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Compartments to fetch.
     */
    orderBy?: CompartmentOrderByWithRelationInput | CompartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Compartments.
     */
    cursor?: CompartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Compartments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Compartments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Compartments.
     */
    distinct?: CompartmentScalarFieldEnum | CompartmentScalarFieldEnum[]
  }

  /**
   * Compartment create
   */
  export type CompartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Compartment.
     */
    data: XOR<CompartmentCreateInput, CompartmentUncheckedCreateInput>
  }

  /**
   * Compartment createMany
   */
  export type CompartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Compartments.
     */
    data: CompartmentCreateManyInput | CompartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Compartment createManyAndReturn
   */
  export type CompartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * The data used to create many Compartments.
     */
    data: CompartmentCreateManyInput | CompartmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Compartment update
   */
  export type CompartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Compartment.
     */
    data: XOR<CompartmentUpdateInput, CompartmentUncheckedUpdateInput>
    /**
     * Choose, which Compartment to update.
     */
    where: CompartmentWhereUniqueInput
  }

  /**
   * Compartment updateMany
   */
  export type CompartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Compartments.
     */
    data: XOR<CompartmentUpdateManyMutationInput, CompartmentUncheckedUpdateManyInput>
    /**
     * Filter which Compartments to update
     */
    where?: CompartmentWhereInput
    /**
     * Limit how many Compartments to update.
     */
    limit?: number
  }

  /**
   * Compartment updateManyAndReturn
   */
  export type CompartmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * The data used to update Compartments.
     */
    data: XOR<CompartmentUpdateManyMutationInput, CompartmentUncheckedUpdateManyInput>
    /**
     * Filter which Compartments to update
     */
    where?: CompartmentWhereInput
    /**
     * Limit how many Compartments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Compartment upsert
   */
  export type CompartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Compartment to update in case it exists.
     */
    where: CompartmentWhereUniqueInput
    /**
     * In case the Compartment found by the `where` argument doesn't exist, create a new Compartment with this data.
     */
    create: XOR<CompartmentCreateInput, CompartmentUncheckedCreateInput>
    /**
     * In case the Compartment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompartmentUpdateInput, CompartmentUncheckedUpdateInput>
  }

  /**
   * Compartment delete
   */
  export type CompartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
    /**
     * Filter which Compartment to delete.
     */
    where: CompartmentWhereUniqueInput
  }

  /**
   * Compartment deleteMany
   */
  export type CompartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Compartments to delete
     */
    where?: CompartmentWhereInput
    /**
     * Limit how many Compartments to delete.
     */
    limit?: number
  }

  /**
   * Compartment.items
   */
  export type Compartment$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    where?: FreezerItemWhereInput
    orderBy?: FreezerItemOrderByWithRelationInput | FreezerItemOrderByWithRelationInput[]
    cursor?: FreezerItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FreezerItemScalarFieldEnum | FreezerItemScalarFieldEnum[]
  }

  /**
   * Compartment without action
   */
  export type CompartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Compartment
     */
    select?: CompartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Compartment
     */
    omit?: CompartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompartmentInclude<ExtArgs> | null
  }


  /**
   * Model FreezerItem
   */

  export type AggregateFreezerItem = {
    _count: FreezerItemCountAggregateOutputType | null
    _min: FreezerItemMinAggregateOutputType | null
    _max: FreezerItemMaxAggregateOutputType | null
  }

  export type FreezerItemMinAggregateOutputType = {
    id: string | null
    householdId: string | null
    freezerId: string | null
    compartmentId: string | null
    name: string | null
    quantity: string | null
    notes: string | null
    storedAt: Date | null
    expiresAt: Date | null
    deletedAt: Date | null
    createdById: string | null
    updatedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FreezerItemMaxAggregateOutputType = {
    id: string | null
    householdId: string | null
    freezerId: string | null
    compartmentId: string | null
    name: string | null
    quantity: string | null
    notes: string | null
    storedAt: Date | null
    expiresAt: Date | null
    deletedAt: Date | null
    createdById: string | null
    updatedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FreezerItemCountAggregateOutputType = {
    id: number
    householdId: number
    freezerId: number
    compartmentId: number
    name: number
    quantity: number
    notes: number
    storedAt: number
    expiresAt: number
    deletedAt: number
    createdById: number
    updatedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FreezerItemMinAggregateInputType = {
    id?: true
    householdId?: true
    freezerId?: true
    compartmentId?: true
    name?: true
    quantity?: true
    notes?: true
    storedAt?: true
    expiresAt?: true
    deletedAt?: true
    createdById?: true
    updatedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FreezerItemMaxAggregateInputType = {
    id?: true
    householdId?: true
    freezerId?: true
    compartmentId?: true
    name?: true
    quantity?: true
    notes?: true
    storedAt?: true
    expiresAt?: true
    deletedAt?: true
    createdById?: true
    updatedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FreezerItemCountAggregateInputType = {
    id?: true
    householdId?: true
    freezerId?: true
    compartmentId?: true
    name?: true
    quantity?: true
    notes?: true
    storedAt?: true
    expiresAt?: true
    deletedAt?: true
    createdById?: true
    updatedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FreezerItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FreezerItem to aggregate.
     */
    where?: FreezerItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FreezerItems to fetch.
     */
    orderBy?: FreezerItemOrderByWithRelationInput | FreezerItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FreezerItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FreezerItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FreezerItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FreezerItems
    **/
    _count?: true | FreezerItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FreezerItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FreezerItemMaxAggregateInputType
  }

  export type GetFreezerItemAggregateType<T extends FreezerItemAggregateArgs> = {
        [P in keyof T & keyof AggregateFreezerItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFreezerItem[P]>
      : GetScalarType<T[P], AggregateFreezerItem[P]>
  }




  export type FreezerItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FreezerItemWhereInput
    orderBy?: FreezerItemOrderByWithAggregationInput | FreezerItemOrderByWithAggregationInput[]
    by: FreezerItemScalarFieldEnum[] | FreezerItemScalarFieldEnum
    having?: FreezerItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FreezerItemCountAggregateInputType | true
    _min?: FreezerItemMinAggregateInputType
    _max?: FreezerItemMaxAggregateInputType
  }

  export type FreezerItemGroupByOutputType = {
    id: string
    householdId: string
    freezerId: string
    compartmentId: string
    name: string
    quantity: string
    notes: string | null
    storedAt: Date
    expiresAt: Date | null
    deletedAt: Date | null
    createdById: string
    updatedById: string
    createdAt: Date
    updatedAt: Date
    _count: FreezerItemCountAggregateOutputType | null
    _min: FreezerItemMinAggregateOutputType | null
    _max: FreezerItemMaxAggregateOutputType | null
  }

  type GetFreezerItemGroupByPayload<T extends FreezerItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FreezerItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FreezerItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FreezerItemGroupByOutputType[P]>
            : GetScalarType<T[P], FreezerItemGroupByOutputType[P]>
        }
      >
    >


  export type FreezerItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    freezerId?: boolean
    compartmentId?: boolean
    name?: boolean
    quantity?: boolean
    notes?: boolean
    storedAt?: boolean
    expiresAt?: boolean
    deletedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
    compartment?: boolean | CompartmentDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
    changeLogs?: boolean | FreezerItem$changeLogsArgs<ExtArgs>
    _count?: boolean | FreezerItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["freezerItem"]>

  export type FreezerItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    freezerId?: boolean
    compartmentId?: boolean
    name?: boolean
    quantity?: boolean
    notes?: boolean
    storedAt?: boolean
    expiresAt?: boolean
    deletedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
    compartment?: boolean | CompartmentDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["freezerItem"]>

  export type FreezerItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    householdId?: boolean
    freezerId?: boolean
    compartmentId?: boolean
    name?: boolean
    quantity?: boolean
    notes?: boolean
    storedAt?: boolean
    expiresAt?: boolean
    deletedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
    compartment?: boolean | CompartmentDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["freezerItem"]>

  export type FreezerItemSelectScalar = {
    id?: boolean
    householdId?: boolean
    freezerId?: boolean
    compartmentId?: boolean
    name?: boolean
    quantity?: boolean
    notes?: boolean
    storedAt?: boolean
    expiresAt?: boolean
    deletedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FreezerItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "householdId" | "freezerId" | "compartmentId" | "name" | "quantity" | "notes" | "storedAt" | "expiresAt" | "deletedAt" | "createdById" | "updatedById" | "createdAt" | "updatedAt", ExtArgs["result"]["freezerItem"]>
  export type FreezerItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
    compartment?: boolean | CompartmentDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
    changeLogs?: boolean | FreezerItem$changeLogsArgs<ExtArgs>
    _count?: boolean | FreezerItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FreezerItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
    compartment?: boolean | CompartmentDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FreezerItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    household?: boolean | HouseholdDefaultArgs<ExtArgs>
    freezer?: boolean | FreezerDefaultArgs<ExtArgs>
    compartment?: boolean | CompartmentDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FreezerItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FreezerItem"
    objects: {
      household: Prisma.$HouseholdPayload<ExtArgs>
      freezer: Prisma.$FreezerPayload<ExtArgs>
      compartment: Prisma.$CompartmentPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
      updatedBy: Prisma.$UserPayload<ExtArgs>
      changeLogs: Prisma.$ItemChangeLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      householdId: string
      freezerId: string
      compartmentId: string
      name: string
      quantity: string
      notes: string | null
      storedAt: Date
      expiresAt: Date | null
      deletedAt: Date | null
      createdById: string
      updatedById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["freezerItem"]>
    composites: {}
  }

  type FreezerItemGetPayload<S extends boolean | null | undefined | FreezerItemDefaultArgs> = $Result.GetResult<Prisma.$FreezerItemPayload, S>

  type FreezerItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FreezerItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FreezerItemCountAggregateInputType | true
    }

  export interface FreezerItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FreezerItem'], meta: { name: 'FreezerItem' } }
    /**
     * Find zero or one FreezerItem that matches the filter.
     * @param {FreezerItemFindUniqueArgs} args - Arguments to find a FreezerItem
     * @example
     * // Get one FreezerItem
     * const freezerItem = await prisma.freezerItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FreezerItemFindUniqueArgs>(args: SelectSubset<T, FreezerItemFindUniqueArgs<ExtArgs>>): Prisma__FreezerItemClient<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FreezerItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FreezerItemFindUniqueOrThrowArgs} args - Arguments to find a FreezerItem
     * @example
     * // Get one FreezerItem
     * const freezerItem = await prisma.freezerItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FreezerItemFindUniqueOrThrowArgs>(args: SelectSubset<T, FreezerItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FreezerItemClient<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FreezerItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerItemFindFirstArgs} args - Arguments to find a FreezerItem
     * @example
     * // Get one FreezerItem
     * const freezerItem = await prisma.freezerItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FreezerItemFindFirstArgs>(args?: SelectSubset<T, FreezerItemFindFirstArgs<ExtArgs>>): Prisma__FreezerItemClient<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FreezerItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerItemFindFirstOrThrowArgs} args - Arguments to find a FreezerItem
     * @example
     * // Get one FreezerItem
     * const freezerItem = await prisma.freezerItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FreezerItemFindFirstOrThrowArgs>(args?: SelectSubset<T, FreezerItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__FreezerItemClient<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FreezerItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FreezerItems
     * const freezerItems = await prisma.freezerItem.findMany()
     * 
     * // Get first 10 FreezerItems
     * const freezerItems = await prisma.freezerItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const freezerItemWithIdOnly = await prisma.freezerItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FreezerItemFindManyArgs>(args?: SelectSubset<T, FreezerItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FreezerItem.
     * @param {FreezerItemCreateArgs} args - Arguments to create a FreezerItem.
     * @example
     * // Create one FreezerItem
     * const FreezerItem = await prisma.freezerItem.create({
     *   data: {
     *     // ... data to create a FreezerItem
     *   }
     * })
     * 
     */
    create<T extends FreezerItemCreateArgs>(args: SelectSubset<T, FreezerItemCreateArgs<ExtArgs>>): Prisma__FreezerItemClient<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FreezerItems.
     * @param {FreezerItemCreateManyArgs} args - Arguments to create many FreezerItems.
     * @example
     * // Create many FreezerItems
     * const freezerItem = await prisma.freezerItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FreezerItemCreateManyArgs>(args?: SelectSubset<T, FreezerItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FreezerItems and returns the data saved in the database.
     * @param {FreezerItemCreateManyAndReturnArgs} args - Arguments to create many FreezerItems.
     * @example
     * // Create many FreezerItems
     * const freezerItem = await prisma.freezerItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FreezerItems and only return the `id`
     * const freezerItemWithIdOnly = await prisma.freezerItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FreezerItemCreateManyAndReturnArgs>(args?: SelectSubset<T, FreezerItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FreezerItem.
     * @param {FreezerItemDeleteArgs} args - Arguments to delete one FreezerItem.
     * @example
     * // Delete one FreezerItem
     * const FreezerItem = await prisma.freezerItem.delete({
     *   where: {
     *     // ... filter to delete one FreezerItem
     *   }
     * })
     * 
     */
    delete<T extends FreezerItemDeleteArgs>(args: SelectSubset<T, FreezerItemDeleteArgs<ExtArgs>>): Prisma__FreezerItemClient<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FreezerItem.
     * @param {FreezerItemUpdateArgs} args - Arguments to update one FreezerItem.
     * @example
     * // Update one FreezerItem
     * const freezerItem = await prisma.freezerItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FreezerItemUpdateArgs>(args: SelectSubset<T, FreezerItemUpdateArgs<ExtArgs>>): Prisma__FreezerItemClient<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FreezerItems.
     * @param {FreezerItemDeleteManyArgs} args - Arguments to filter FreezerItems to delete.
     * @example
     * // Delete a few FreezerItems
     * const { count } = await prisma.freezerItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FreezerItemDeleteManyArgs>(args?: SelectSubset<T, FreezerItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FreezerItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FreezerItems
     * const freezerItem = await prisma.freezerItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FreezerItemUpdateManyArgs>(args: SelectSubset<T, FreezerItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FreezerItems and returns the data updated in the database.
     * @param {FreezerItemUpdateManyAndReturnArgs} args - Arguments to update many FreezerItems.
     * @example
     * // Update many FreezerItems
     * const freezerItem = await prisma.freezerItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FreezerItems and only return the `id`
     * const freezerItemWithIdOnly = await prisma.freezerItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FreezerItemUpdateManyAndReturnArgs>(args: SelectSubset<T, FreezerItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FreezerItem.
     * @param {FreezerItemUpsertArgs} args - Arguments to update or create a FreezerItem.
     * @example
     * // Update or create a FreezerItem
     * const freezerItem = await prisma.freezerItem.upsert({
     *   create: {
     *     // ... data to create a FreezerItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FreezerItem we want to update
     *   }
     * })
     */
    upsert<T extends FreezerItemUpsertArgs>(args: SelectSubset<T, FreezerItemUpsertArgs<ExtArgs>>): Prisma__FreezerItemClient<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FreezerItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerItemCountArgs} args - Arguments to filter FreezerItems to count.
     * @example
     * // Count the number of FreezerItems
     * const count = await prisma.freezerItem.count({
     *   where: {
     *     // ... the filter for the FreezerItems we want to count
     *   }
     * })
    **/
    count<T extends FreezerItemCountArgs>(
      args?: Subset<T, FreezerItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FreezerItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FreezerItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FreezerItemAggregateArgs>(args: Subset<T, FreezerItemAggregateArgs>): Prisma.PrismaPromise<GetFreezerItemAggregateType<T>>

    /**
     * Group by FreezerItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FreezerItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FreezerItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FreezerItemGroupByArgs['orderBy'] }
        : { orderBy?: FreezerItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FreezerItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFreezerItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FreezerItem model
   */
  readonly fields: FreezerItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FreezerItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FreezerItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    household<T extends HouseholdDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HouseholdDefaultArgs<ExtArgs>>): Prisma__HouseholdClient<$Result.GetResult<Prisma.$HouseholdPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    freezer<T extends FreezerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FreezerDefaultArgs<ExtArgs>>): Prisma__FreezerClient<$Result.GetResult<Prisma.$FreezerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    compartment<T extends CompartmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompartmentDefaultArgs<ExtArgs>>): Prisma__CompartmentClient<$Result.GetResult<Prisma.$CompartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    updatedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    changeLogs<T extends FreezerItem$changeLogsArgs<ExtArgs> = {}>(args?: Subset<T, FreezerItem$changeLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FreezerItem model
   */
  interface FreezerItemFieldRefs {
    readonly id: FieldRef<"FreezerItem", 'String'>
    readonly householdId: FieldRef<"FreezerItem", 'String'>
    readonly freezerId: FieldRef<"FreezerItem", 'String'>
    readonly compartmentId: FieldRef<"FreezerItem", 'String'>
    readonly name: FieldRef<"FreezerItem", 'String'>
    readonly quantity: FieldRef<"FreezerItem", 'String'>
    readonly notes: FieldRef<"FreezerItem", 'String'>
    readonly storedAt: FieldRef<"FreezerItem", 'DateTime'>
    readonly expiresAt: FieldRef<"FreezerItem", 'DateTime'>
    readonly deletedAt: FieldRef<"FreezerItem", 'DateTime'>
    readonly createdById: FieldRef<"FreezerItem", 'String'>
    readonly updatedById: FieldRef<"FreezerItem", 'String'>
    readonly createdAt: FieldRef<"FreezerItem", 'DateTime'>
    readonly updatedAt: FieldRef<"FreezerItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FreezerItem findUnique
   */
  export type FreezerItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    /**
     * Filter, which FreezerItem to fetch.
     */
    where: FreezerItemWhereUniqueInput
  }

  /**
   * FreezerItem findUniqueOrThrow
   */
  export type FreezerItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    /**
     * Filter, which FreezerItem to fetch.
     */
    where: FreezerItemWhereUniqueInput
  }

  /**
   * FreezerItem findFirst
   */
  export type FreezerItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    /**
     * Filter, which FreezerItem to fetch.
     */
    where?: FreezerItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FreezerItems to fetch.
     */
    orderBy?: FreezerItemOrderByWithRelationInput | FreezerItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FreezerItems.
     */
    cursor?: FreezerItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FreezerItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FreezerItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FreezerItems.
     */
    distinct?: FreezerItemScalarFieldEnum | FreezerItemScalarFieldEnum[]
  }

  /**
   * FreezerItem findFirstOrThrow
   */
  export type FreezerItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    /**
     * Filter, which FreezerItem to fetch.
     */
    where?: FreezerItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FreezerItems to fetch.
     */
    orderBy?: FreezerItemOrderByWithRelationInput | FreezerItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FreezerItems.
     */
    cursor?: FreezerItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FreezerItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FreezerItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FreezerItems.
     */
    distinct?: FreezerItemScalarFieldEnum | FreezerItemScalarFieldEnum[]
  }

  /**
   * FreezerItem findMany
   */
  export type FreezerItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    /**
     * Filter, which FreezerItems to fetch.
     */
    where?: FreezerItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FreezerItems to fetch.
     */
    orderBy?: FreezerItemOrderByWithRelationInput | FreezerItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FreezerItems.
     */
    cursor?: FreezerItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FreezerItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FreezerItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FreezerItems.
     */
    distinct?: FreezerItemScalarFieldEnum | FreezerItemScalarFieldEnum[]
  }

  /**
   * FreezerItem create
   */
  export type FreezerItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    /**
     * The data needed to create a FreezerItem.
     */
    data: XOR<FreezerItemCreateInput, FreezerItemUncheckedCreateInput>
  }

  /**
   * FreezerItem createMany
   */
  export type FreezerItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FreezerItems.
     */
    data: FreezerItemCreateManyInput | FreezerItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FreezerItem createManyAndReturn
   */
  export type FreezerItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * The data used to create many FreezerItems.
     */
    data: FreezerItemCreateManyInput | FreezerItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FreezerItem update
   */
  export type FreezerItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    /**
     * The data needed to update a FreezerItem.
     */
    data: XOR<FreezerItemUpdateInput, FreezerItemUncheckedUpdateInput>
    /**
     * Choose, which FreezerItem to update.
     */
    where: FreezerItemWhereUniqueInput
  }

  /**
   * FreezerItem updateMany
   */
  export type FreezerItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FreezerItems.
     */
    data: XOR<FreezerItemUpdateManyMutationInput, FreezerItemUncheckedUpdateManyInput>
    /**
     * Filter which FreezerItems to update
     */
    where?: FreezerItemWhereInput
    /**
     * Limit how many FreezerItems to update.
     */
    limit?: number
  }

  /**
   * FreezerItem updateManyAndReturn
   */
  export type FreezerItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * The data used to update FreezerItems.
     */
    data: XOR<FreezerItemUpdateManyMutationInput, FreezerItemUncheckedUpdateManyInput>
    /**
     * Filter which FreezerItems to update
     */
    where?: FreezerItemWhereInput
    /**
     * Limit how many FreezerItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FreezerItem upsert
   */
  export type FreezerItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    /**
     * The filter to search for the FreezerItem to update in case it exists.
     */
    where: FreezerItemWhereUniqueInput
    /**
     * In case the FreezerItem found by the `where` argument doesn't exist, create a new FreezerItem with this data.
     */
    create: XOR<FreezerItemCreateInput, FreezerItemUncheckedCreateInput>
    /**
     * In case the FreezerItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FreezerItemUpdateInput, FreezerItemUncheckedUpdateInput>
  }

  /**
   * FreezerItem delete
   */
  export type FreezerItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
    /**
     * Filter which FreezerItem to delete.
     */
    where: FreezerItemWhereUniqueInput
  }

  /**
   * FreezerItem deleteMany
   */
  export type FreezerItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FreezerItems to delete
     */
    where?: FreezerItemWhereInput
    /**
     * Limit how many FreezerItems to delete.
     */
    limit?: number
  }

  /**
   * FreezerItem.changeLogs
   */
  export type FreezerItem$changeLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    where?: ItemChangeLogWhereInput
    orderBy?: ItemChangeLogOrderByWithRelationInput | ItemChangeLogOrderByWithRelationInput[]
    cursor?: ItemChangeLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemChangeLogScalarFieldEnum | ItemChangeLogScalarFieldEnum[]
  }

  /**
   * FreezerItem without action
   */
  export type FreezerItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FreezerItem
     */
    select?: FreezerItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FreezerItem
     */
    omit?: FreezerItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FreezerItemInclude<ExtArgs> | null
  }


  /**
   * Model ItemChangeLog
   */

  export type AggregateItemChangeLog = {
    _count: ItemChangeLogCountAggregateOutputType | null
    _min: ItemChangeLogMinAggregateOutputType | null
    _max: ItemChangeLogMaxAggregateOutputType | null
  }

  export type ItemChangeLogMinAggregateOutputType = {
    id: string | null
    itemId: string | null
    changedById: string | null
    changedAt: Date | null
    fieldName: string | null
    oldValue: string | null
    newValue: string | null
  }

  export type ItemChangeLogMaxAggregateOutputType = {
    id: string | null
    itemId: string | null
    changedById: string | null
    changedAt: Date | null
    fieldName: string | null
    oldValue: string | null
    newValue: string | null
  }

  export type ItemChangeLogCountAggregateOutputType = {
    id: number
    itemId: number
    changedById: number
    changedAt: number
    fieldName: number
    oldValue: number
    newValue: number
    _all: number
  }


  export type ItemChangeLogMinAggregateInputType = {
    id?: true
    itemId?: true
    changedById?: true
    changedAt?: true
    fieldName?: true
    oldValue?: true
    newValue?: true
  }

  export type ItemChangeLogMaxAggregateInputType = {
    id?: true
    itemId?: true
    changedById?: true
    changedAt?: true
    fieldName?: true
    oldValue?: true
    newValue?: true
  }

  export type ItemChangeLogCountAggregateInputType = {
    id?: true
    itemId?: true
    changedById?: true
    changedAt?: true
    fieldName?: true
    oldValue?: true
    newValue?: true
    _all?: true
  }

  export type ItemChangeLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemChangeLog to aggregate.
     */
    where?: ItemChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemChangeLogs to fetch.
     */
    orderBy?: ItemChangeLogOrderByWithRelationInput | ItemChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemChangeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemChangeLogs
    **/
    _count?: true | ItemChangeLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemChangeLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemChangeLogMaxAggregateInputType
  }

  export type GetItemChangeLogAggregateType<T extends ItemChangeLogAggregateArgs> = {
        [P in keyof T & keyof AggregateItemChangeLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemChangeLog[P]>
      : GetScalarType<T[P], AggregateItemChangeLog[P]>
  }




  export type ItemChangeLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemChangeLogWhereInput
    orderBy?: ItemChangeLogOrderByWithAggregationInput | ItemChangeLogOrderByWithAggregationInput[]
    by: ItemChangeLogScalarFieldEnum[] | ItemChangeLogScalarFieldEnum
    having?: ItemChangeLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemChangeLogCountAggregateInputType | true
    _min?: ItemChangeLogMinAggregateInputType
    _max?: ItemChangeLogMaxAggregateInputType
  }

  export type ItemChangeLogGroupByOutputType = {
    id: string
    itemId: string
    changedById: string
    changedAt: Date
    fieldName: string
    oldValue: string | null
    newValue: string | null
    _count: ItemChangeLogCountAggregateOutputType | null
    _min: ItemChangeLogMinAggregateOutputType | null
    _max: ItemChangeLogMaxAggregateOutputType | null
  }

  type GetItemChangeLogGroupByPayload<T extends ItemChangeLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemChangeLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemChangeLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemChangeLogGroupByOutputType[P]>
            : GetScalarType<T[P], ItemChangeLogGroupByOutputType[P]>
        }
      >
    >


  export type ItemChangeLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    changedById?: boolean
    changedAt?: boolean
    fieldName?: boolean
    oldValue?: boolean
    newValue?: boolean
    item?: boolean | FreezerItemDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemChangeLog"]>

  export type ItemChangeLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    changedById?: boolean
    changedAt?: boolean
    fieldName?: boolean
    oldValue?: boolean
    newValue?: boolean
    item?: boolean | FreezerItemDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemChangeLog"]>

  export type ItemChangeLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    changedById?: boolean
    changedAt?: boolean
    fieldName?: boolean
    oldValue?: boolean
    newValue?: boolean
    item?: boolean | FreezerItemDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemChangeLog"]>

  export type ItemChangeLogSelectScalar = {
    id?: boolean
    itemId?: boolean
    changedById?: boolean
    changedAt?: boolean
    fieldName?: boolean
    oldValue?: boolean
    newValue?: boolean
  }

  export type ItemChangeLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "itemId" | "changedById" | "changedAt" | "fieldName" | "oldValue" | "newValue", ExtArgs["result"]["itemChangeLog"]>
  export type ItemChangeLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | FreezerItemDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ItemChangeLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | FreezerItemDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ItemChangeLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | FreezerItemDefaultArgs<ExtArgs>
    changedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ItemChangeLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemChangeLog"
    objects: {
      item: Prisma.$FreezerItemPayload<ExtArgs>
      changedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      itemId: string
      changedById: string
      changedAt: Date
      fieldName: string
      oldValue: string | null
      newValue: string | null
    }, ExtArgs["result"]["itemChangeLog"]>
    composites: {}
  }

  type ItemChangeLogGetPayload<S extends boolean | null | undefined | ItemChangeLogDefaultArgs> = $Result.GetResult<Prisma.$ItemChangeLogPayload, S>

  type ItemChangeLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemChangeLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemChangeLogCountAggregateInputType | true
    }

  export interface ItemChangeLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemChangeLog'], meta: { name: 'ItemChangeLog' } }
    /**
     * Find zero or one ItemChangeLog that matches the filter.
     * @param {ItemChangeLogFindUniqueArgs} args - Arguments to find a ItemChangeLog
     * @example
     * // Get one ItemChangeLog
     * const itemChangeLog = await prisma.itemChangeLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemChangeLogFindUniqueArgs>(args: SelectSubset<T, ItemChangeLogFindUniqueArgs<ExtArgs>>): Prisma__ItemChangeLogClient<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemChangeLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemChangeLogFindUniqueOrThrowArgs} args - Arguments to find a ItemChangeLog
     * @example
     * // Get one ItemChangeLog
     * const itemChangeLog = await prisma.itemChangeLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemChangeLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemChangeLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemChangeLogClient<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemChangeLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemChangeLogFindFirstArgs} args - Arguments to find a ItemChangeLog
     * @example
     * // Get one ItemChangeLog
     * const itemChangeLog = await prisma.itemChangeLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemChangeLogFindFirstArgs>(args?: SelectSubset<T, ItemChangeLogFindFirstArgs<ExtArgs>>): Prisma__ItemChangeLogClient<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemChangeLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemChangeLogFindFirstOrThrowArgs} args - Arguments to find a ItemChangeLog
     * @example
     * // Get one ItemChangeLog
     * const itemChangeLog = await prisma.itemChangeLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemChangeLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemChangeLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemChangeLogClient<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemChangeLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemChangeLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemChangeLogs
     * const itemChangeLogs = await prisma.itemChangeLog.findMany()
     * 
     * // Get first 10 ItemChangeLogs
     * const itemChangeLogs = await prisma.itemChangeLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemChangeLogWithIdOnly = await prisma.itemChangeLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemChangeLogFindManyArgs>(args?: SelectSubset<T, ItemChangeLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemChangeLog.
     * @param {ItemChangeLogCreateArgs} args - Arguments to create a ItemChangeLog.
     * @example
     * // Create one ItemChangeLog
     * const ItemChangeLog = await prisma.itemChangeLog.create({
     *   data: {
     *     // ... data to create a ItemChangeLog
     *   }
     * })
     * 
     */
    create<T extends ItemChangeLogCreateArgs>(args: SelectSubset<T, ItemChangeLogCreateArgs<ExtArgs>>): Prisma__ItemChangeLogClient<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemChangeLogs.
     * @param {ItemChangeLogCreateManyArgs} args - Arguments to create many ItemChangeLogs.
     * @example
     * // Create many ItemChangeLogs
     * const itemChangeLog = await prisma.itemChangeLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemChangeLogCreateManyArgs>(args?: SelectSubset<T, ItemChangeLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemChangeLogs and returns the data saved in the database.
     * @param {ItemChangeLogCreateManyAndReturnArgs} args - Arguments to create many ItemChangeLogs.
     * @example
     * // Create many ItemChangeLogs
     * const itemChangeLog = await prisma.itemChangeLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemChangeLogs and only return the `id`
     * const itemChangeLogWithIdOnly = await prisma.itemChangeLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemChangeLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemChangeLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemChangeLog.
     * @param {ItemChangeLogDeleteArgs} args - Arguments to delete one ItemChangeLog.
     * @example
     * // Delete one ItemChangeLog
     * const ItemChangeLog = await prisma.itemChangeLog.delete({
     *   where: {
     *     // ... filter to delete one ItemChangeLog
     *   }
     * })
     * 
     */
    delete<T extends ItemChangeLogDeleteArgs>(args: SelectSubset<T, ItemChangeLogDeleteArgs<ExtArgs>>): Prisma__ItemChangeLogClient<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemChangeLog.
     * @param {ItemChangeLogUpdateArgs} args - Arguments to update one ItemChangeLog.
     * @example
     * // Update one ItemChangeLog
     * const itemChangeLog = await prisma.itemChangeLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemChangeLogUpdateArgs>(args: SelectSubset<T, ItemChangeLogUpdateArgs<ExtArgs>>): Prisma__ItemChangeLogClient<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemChangeLogs.
     * @param {ItemChangeLogDeleteManyArgs} args - Arguments to filter ItemChangeLogs to delete.
     * @example
     * // Delete a few ItemChangeLogs
     * const { count } = await prisma.itemChangeLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemChangeLogDeleteManyArgs>(args?: SelectSubset<T, ItemChangeLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemChangeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemChangeLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemChangeLogs
     * const itemChangeLog = await prisma.itemChangeLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemChangeLogUpdateManyArgs>(args: SelectSubset<T, ItemChangeLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemChangeLogs and returns the data updated in the database.
     * @param {ItemChangeLogUpdateManyAndReturnArgs} args - Arguments to update many ItemChangeLogs.
     * @example
     * // Update many ItemChangeLogs
     * const itemChangeLog = await prisma.itemChangeLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItemChangeLogs and only return the `id`
     * const itemChangeLogWithIdOnly = await prisma.itemChangeLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemChangeLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemChangeLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItemChangeLog.
     * @param {ItemChangeLogUpsertArgs} args - Arguments to update or create a ItemChangeLog.
     * @example
     * // Update or create a ItemChangeLog
     * const itemChangeLog = await prisma.itemChangeLog.upsert({
     *   create: {
     *     // ... data to create a ItemChangeLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemChangeLog we want to update
     *   }
     * })
     */
    upsert<T extends ItemChangeLogUpsertArgs>(args: SelectSubset<T, ItemChangeLogUpsertArgs<ExtArgs>>): Prisma__ItemChangeLogClient<$Result.GetResult<Prisma.$ItemChangeLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemChangeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemChangeLogCountArgs} args - Arguments to filter ItemChangeLogs to count.
     * @example
     * // Count the number of ItemChangeLogs
     * const count = await prisma.itemChangeLog.count({
     *   where: {
     *     // ... the filter for the ItemChangeLogs we want to count
     *   }
     * })
    **/
    count<T extends ItemChangeLogCountArgs>(
      args?: Subset<T, ItemChangeLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemChangeLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemChangeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemChangeLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemChangeLogAggregateArgs>(args: Subset<T, ItemChangeLogAggregateArgs>): Prisma.PrismaPromise<GetItemChangeLogAggregateType<T>>

    /**
     * Group by ItemChangeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemChangeLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemChangeLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemChangeLogGroupByArgs['orderBy'] }
        : { orderBy?: ItemChangeLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemChangeLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemChangeLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemChangeLog model
   */
  readonly fields: ItemChangeLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemChangeLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemChangeLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends FreezerItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FreezerItemDefaultArgs<ExtArgs>>): Prisma__FreezerItemClient<$Result.GetResult<Prisma.$FreezerItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    changedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemChangeLog model
   */
  interface ItemChangeLogFieldRefs {
    readonly id: FieldRef<"ItemChangeLog", 'String'>
    readonly itemId: FieldRef<"ItemChangeLog", 'String'>
    readonly changedById: FieldRef<"ItemChangeLog", 'String'>
    readonly changedAt: FieldRef<"ItemChangeLog", 'DateTime'>
    readonly fieldName: FieldRef<"ItemChangeLog", 'String'>
    readonly oldValue: FieldRef<"ItemChangeLog", 'String'>
    readonly newValue: FieldRef<"ItemChangeLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ItemChangeLog findUnique
   */
  export type ItemChangeLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    /**
     * Filter, which ItemChangeLog to fetch.
     */
    where: ItemChangeLogWhereUniqueInput
  }

  /**
   * ItemChangeLog findUniqueOrThrow
   */
  export type ItemChangeLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    /**
     * Filter, which ItemChangeLog to fetch.
     */
    where: ItemChangeLogWhereUniqueInput
  }

  /**
   * ItemChangeLog findFirst
   */
  export type ItemChangeLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    /**
     * Filter, which ItemChangeLog to fetch.
     */
    where?: ItemChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemChangeLogs to fetch.
     */
    orderBy?: ItemChangeLogOrderByWithRelationInput | ItemChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemChangeLogs.
     */
    cursor?: ItemChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemChangeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemChangeLogs.
     */
    distinct?: ItemChangeLogScalarFieldEnum | ItemChangeLogScalarFieldEnum[]
  }

  /**
   * ItemChangeLog findFirstOrThrow
   */
  export type ItemChangeLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    /**
     * Filter, which ItemChangeLog to fetch.
     */
    where?: ItemChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemChangeLogs to fetch.
     */
    orderBy?: ItemChangeLogOrderByWithRelationInput | ItemChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemChangeLogs.
     */
    cursor?: ItemChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemChangeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemChangeLogs.
     */
    distinct?: ItemChangeLogScalarFieldEnum | ItemChangeLogScalarFieldEnum[]
  }

  /**
   * ItemChangeLog findMany
   */
  export type ItemChangeLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    /**
     * Filter, which ItemChangeLogs to fetch.
     */
    where?: ItemChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemChangeLogs to fetch.
     */
    orderBy?: ItemChangeLogOrderByWithRelationInput | ItemChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemChangeLogs.
     */
    cursor?: ItemChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemChangeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemChangeLogs.
     */
    distinct?: ItemChangeLogScalarFieldEnum | ItemChangeLogScalarFieldEnum[]
  }

  /**
   * ItemChangeLog create
   */
  export type ItemChangeLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemChangeLog.
     */
    data: XOR<ItemChangeLogCreateInput, ItemChangeLogUncheckedCreateInput>
  }

  /**
   * ItemChangeLog createMany
   */
  export type ItemChangeLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemChangeLogs.
     */
    data: ItemChangeLogCreateManyInput | ItemChangeLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemChangeLog createManyAndReturn
   */
  export type ItemChangeLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * The data used to create many ItemChangeLogs.
     */
    data: ItemChangeLogCreateManyInput | ItemChangeLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemChangeLog update
   */
  export type ItemChangeLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemChangeLog.
     */
    data: XOR<ItemChangeLogUpdateInput, ItemChangeLogUncheckedUpdateInput>
    /**
     * Choose, which ItemChangeLog to update.
     */
    where: ItemChangeLogWhereUniqueInput
  }

  /**
   * ItemChangeLog updateMany
   */
  export type ItemChangeLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemChangeLogs.
     */
    data: XOR<ItemChangeLogUpdateManyMutationInput, ItemChangeLogUncheckedUpdateManyInput>
    /**
     * Filter which ItemChangeLogs to update
     */
    where?: ItemChangeLogWhereInput
    /**
     * Limit how many ItemChangeLogs to update.
     */
    limit?: number
  }

  /**
   * ItemChangeLog updateManyAndReturn
   */
  export type ItemChangeLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * The data used to update ItemChangeLogs.
     */
    data: XOR<ItemChangeLogUpdateManyMutationInput, ItemChangeLogUncheckedUpdateManyInput>
    /**
     * Filter which ItemChangeLogs to update
     */
    where?: ItemChangeLogWhereInput
    /**
     * Limit how many ItemChangeLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemChangeLog upsert
   */
  export type ItemChangeLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemChangeLog to update in case it exists.
     */
    where: ItemChangeLogWhereUniqueInput
    /**
     * In case the ItemChangeLog found by the `where` argument doesn't exist, create a new ItemChangeLog with this data.
     */
    create: XOR<ItemChangeLogCreateInput, ItemChangeLogUncheckedCreateInput>
    /**
     * In case the ItemChangeLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemChangeLogUpdateInput, ItemChangeLogUncheckedUpdateInput>
  }

  /**
   * ItemChangeLog delete
   */
  export type ItemChangeLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
    /**
     * Filter which ItemChangeLog to delete.
     */
    where: ItemChangeLogWhereUniqueInput
  }

  /**
   * ItemChangeLog deleteMany
   */
  export type ItemChangeLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemChangeLogs to delete
     */
    where?: ItemChangeLogWhereInput
    /**
     * Limit how many ItemChangeLogs to delete.
     */
    limit?: number
  }

  /**
   * ItemChangeLog without action
   */
  export type ItemChangeLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemChangeLog
     */
    select?: ItemChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemChangeLog
     */
    omit?: ItemChangeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemChangeLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const HouseholdScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    ownerId: 'ownerId'
  };

  export type HouseholdScalarFieldEnum = (typeof HouseholdScalarFieldEnum)[keyof typeof HouseholdScalarFieldEnum]


  export const HouseholdMemberScalarFieldEnum: {
    id: 'id',
    householdId: 'householdId',
    userId: 'userId',
    role: 'role',
    joinedAt: 'joinedAt'
  };

  export type HouseholdMemberScalarFieldEnum = (typeof HouseholdMemberScalarFieldEnum)[keyof typeof HouseholdMemberScalarFieldEnum]


  export const HouseholdInviteScalarFieldEnum: {
    id: 'id',
    householdId: 'householdId',
    code: 'code',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    usedByUserId: 'usedByUserId',
    createdAt: 'createdAt'
  };

  export type HouseholdInviteScalarFieldEnum = (typeof HouseholdInviteScalarFieldEnum)[keyof typeof HouseholdInviteScalarFieldEnum]


  export const FreezerScalarFieldEnum: {
    id: 'id',
    householdId: 'householdId',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type FreezerScalarFieldEnum = (typeof FreezerScalarFieldEnum)[keyof typeof FreezerScalarFieldEnum]


  export const CompartmentScalarFieldEnum: {
    id: 'id',
    freezerId: 'freezerId',
    name: 'name',
    position: 'position'
  };

  export type CompartmentScalarFieldEnum = (typeof CompartmentScalarFieldEnum)[keyof typeof CompartmentScalarFieldEnum]


  export const FreezerItemScalarFieldEnum: {
    id: 'id',
    householdId: 'householdId',
    freezerId: 'freezerId',
    compartmentId: 'compartmentId',
    name: 'name',
    quantity: 'quantity',
    notes: 'notes',
    storedAt: 'storedAt',
    expiresAt: 'expiresAt',
    deletedAt: 'deletedAt',
    createdById: 'createdById',
    updatedById: 'updatedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FreezerItemScalarFieldEnum = (typeof FreezerItemScalarFieldEnum)[keyof typeof FreezerItemScalarFieldEnum]


  export const ItemChangeLogScalarFieldEnum: {
    id: 'id',
    itemId: 'itemId',
    changedById: 'changedById',
    changedAt: 'changedAt',
    fieldName: 'fieldName',
    oldValue: 'oldValue',
    newValue: 'newValue'
  };

  export type ItemChangeLogScalarFieldEnum = (typeof ItemChangeLogScalarFieldEnum)[keyof typeof ItemChangeLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'HouseholdRole'
   */
  export type EnumHouseholdRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HouseholdRole'>
    


  /**
   * Reference to a field of type 'HouseholdRole[]'
   */
  export type ListEnumHouseholdRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HouseholdRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    memberships?: HouseholdMemberListRelationFilter
    ownedHouseholds?: HouseholdListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    createdItems?: FreezerItemListRelationFilter
    updatedItems?: FreezerItemListRelationFilter
    changeLogs?: ItemChangeLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    memberships?: HouseholdMemberOrderByRelationAggregateInput
    ownedHouseholds?: HouseholdOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    createdItems?: FreezerItemOrderByRelationAggregateInput
    updatedItems?: FreezerItemOrderByRelationAggregateInput
    changeLogs?: ItemChangeLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    memberships?: HouseholdMemberListRelationFilter
    ownedHouseholds?: HouseholdListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    createdItems?: FreezerItemListRelationFilter
    updatedItems?: FreezerItemListRelationFilter
    changeLogs?: ItemChangeLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    userId?: StringWithAggregatesFilter<"RefreshToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type HouseholdWhereInput = {
    AND?: HouseholdWhereInput | HouseholdWhereInput[]
    OR?: HouseholdWhereInput[]
    NOT?: HouseholdWhereInput | HouseholdWhereInput[]
    id?: StringFilter<"Household"> | string
    name?: StringFilter<"Household"> | string
    createdAt?: DateTimeFilter<"Household"> | Date | string
    ownerId?: StringFilter<"Household"> | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: HouseholdMemberListRelationFilter
    freezers?: FreezerListRelationFilter
    items?: FreezerItemListRelationFilter
    invites?: HouseholdInviteListRelationFilter
  }

  export type HouseholdOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    ownerId?: SortOrder
    owner?: UserOrderByWithRelationInput
    members?: HouseholdMemberOrderByRelationAggregateInput
    freezers?: FreezerOrderByRelationAggregateInput
    items?: FreezerItemOrderByRelationAggregateInput
    invites?: HouseholdInviteOrderByRelationAggregateInput
  }

  export type HouseholdWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HouseholdWhereInput | HouseholdWhereInput[]
    OR?: HouseholdWhereInput[]
    NOT?: HouseholdWhereInput | HouseholdWhereInput[]
    name?: StringFilter<"Household"> | string
    createdAt?: DateTimeFilter<"Household"> | Date | string
    ownerId?: StringFilter<"Household"> | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: HouseholdMemberListRelationFilter
    freezers?: FreezerListRelationFilter
    items?: FreezerItemListRelationFilter
    invites?: HouseholdInviteListRelationFilter
  }, "id">

  export type HouseholdOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    ownerId?: SortOrder
    _count?: HouseholdCountOrderByAggregateInput
    _max?: HouseholdMaxOrderByAggregateInput
    _min?: HouseholdMinOrderByAggregateInput
  }

  export type HouseholdScalarWhereWithAggregatesInput = {
    AND?: HouseholdScalarWhereWithAggregatesInput | HouseholdScalarWhereWithAggregatesInput[]
    OR?: HouseholdScalarWhereWithAggregatesInput[]
    NOT?: HouseholdScalarWhereWithAggregatesInput | HouseholdScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Household"> | string
    name?: StringWithAggregatesFilter<"Household"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Household"> | Date | string
    ownerId?: StringWithAggregatesFilter<"Household"> | string
  }

  export type HouseholdMemberWhereInput = {
    AND?: HouseholdMemberWhereInput | HouseholdMemberWhereInput[]
    OR?: HouseholdMemberWhereInput[]
    NOT?: HouseholdMemberWhereInput | HouseholdMemberWhereInput[]
    id?: StringFilter<"HouseholdMember"> | string
    householdId?: StringFilter<"HouseholdMember"> | string
    userId?: StringFilter<"HouseholdMember"> | string
    role?: EnumHouseholdRoleFilter<"HouseholdMember"> | $Enums.HouseholdRole
    joinedAt?: DateTimeFilter<"HouseholdMember"> | Date | string
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type HouseholdMemberOrderByWithRelationInput = {
    id?: SortOrder
    householdId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    household?: HouseholdOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type HouseholdMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    householdId_userId?: HouseholdMemberHouseholdIdUserIdCompoundUniqueInput
    AND?: HouseholdMemberWhereInput | HouseholdMemberWhereInput[]
    OR?: HouseholdMemberWhereInput[]
    NOT?: HouseholdMemberWhereInput | HouseholdMemberWhereInput[]
    householdId?: StringFilter<"HouseholdMember"> | string
    userId?: StringFilter<"HouseholdMember"> | string
    role?: EnumHouseholdRoleFilter<"HouseholdMember"> | $Enums.HouseholdRole
    joinedAt?: DateTimeFilter<"HouseholdMember"> | Date | string
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "householdId_userId">

  export type HouseholdMemberOrderByWithAggregationInput = {
    id?: SortOrder
    householdId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    _count?: HouseholdMemberCountOrderByAggregateInput
    _max?: HouseholdMemberMaxOrderByAggregateInput
    _min?: HouseholdMemberMinOrderByAggregateInput
  }

  export type HouseholdMemberScalarWhereWithAggregatesInput = {
    AND?: HouseholdMemberScalarWhereWithAggregatesInput | HouseholdMemberScalarWhereWithAggregatesInput[]
    OR?: HouseholdMemberScalarWhereWithAggregatesInput[]
    NOT?: HouseholdMemberScalarWhereWithAggregatesInput | HouseholdMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HouseholdMember"> | string
    householdId?: StringWithAggregatesFilter<"HouseholdMember"> | string
    userId?: StringWithAggregatesFilter<"HouseholdMember"> | string
    role?: EnumHouseholdRoleWithAggregatesFilter<"HouseholdMember"> | $Enums.HouseholdRole
    joinedAt?: DateTimeWithAggregatesFilter<"HouseholdMember"> | Date | string
  }

  export type HouseholdInviteWhereInput = {
    AND?: HouseholdInviteWhereInput | HouseholdInviteWhereInput[]
    OR?: HouseholdInviteWhereInput[]
    NOT?: HouseholdInviteWhereInput | HouseholdInviteWhereInput[]
    id?: StringFilter<"HouseholdInvite"> | string
    householdId?: StringFilter<"HouseholdInvite"> | string
    code?: StringFilter<"HouseholdInvite"> | string
    expiresAt?: DateTimeFilter<"HouseholdInvite"> | Date | string
    usedAt?: DateTimeNullableFilter<"HouseholdInvite"> | Date | string | null
    usedByUserId?: StringNullableFilter<"HouseholdInvite"> | string | null
    createdAt?: DateTimeFilter<"HouseholdInvite"> | Date | string
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
  }

  export type HouseholdInviteOrderByWithRelationInput = {
    id?: SortOrder
    householdId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    usedByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    household?: HouseholdOrderByWithRelationInput
  }

  export type HouseholdInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: HouseholdInviteWhereInput | HouseholdInviteWhereInput[]
    OR?: HouseholdInviteWhereInput[]
    NOT?: HouseholdInviteWhereInput | HouseholdInviteWhereInput[]
    householdId?: StringFilter<"HouseholdInvite"> | string
    expiresAt?: DateTimeFilter<"HouseholdInvite"> | Date | string
    usedAt?: DateTimeNullableFilter<"HouseholdInvite"> | Date | string | null
    usedByUserId?: StringNullableFilter<"HouseholdInvite"> | string | null
    createdAt?: DateTimeFilter<"HouseholdInvite"> | Date | string
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
  }, "id" | "code">

  export type HouseholdInviteOrderByWithAggregationInput = {
    id?: SortOrder
    householdId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    usedByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: HouseholdInviteCountOrderByAggregateInput
    _max?: HouseholdInviteMaxOrderByAggregateInput
    _min?: HouseholdInviteMinOrderByAggregateInput
  }

  export type HouseholdInviteScalarWhereWithAggregatesInput = {
    AND?: HouseholdInviteScalarWhereWithAggregatesInput | HouseholdInviteScalarWhereWithAggregatesInput[]
    OR?: HouseholdInviteScalarWhereWithAggregatesInput[]
    NOT?: HouseholdInviteScalarWhereWithAggregatesInput | HouseholdInviteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HouseholdInvite"> | string
    householdId?: StringWithAggregatesFilter<"HouseholdInvite"> | string
    code?: StringWithAggregatesFilter<"HouseholdInvite"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"HouseholdInvite"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"HouseholdInvite"> | Date | string | null
    usedByUserId?: StringNullableWithAggregatesFilter<"HouseholdInvite"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HouseholdInvite"> | Date | string
  }

  export type FreezerWhereInput = {
    AND?: FreezerWhereInput | FreezerWhereInput[]
    OR?: FreezerWhereInput[]
    NOT?: FreezerWhereInput | FreezerWhereInput[]
    id?: StringFilter<"Freezer"> | string
    householdId?: StringFilter<"Freezer"> | string
    name?: StringFilter<"Freezer"> | string
    description?: StringNullableFilter<"Freezer"> | string | null
    createdAt?: DateTimeFilter<"Freezer"> | Date | string
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
    compartments?: CompartmentListRelationFilter
    items?: FreezerItemListRelationFilter
  }

  export type FreezerOrderByWithRelationInput = {
    id?: SortOrder
    householdId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    household?: HouseholdOrderByWithRelationInput
    compartments?: CompartmentOrderByRelationAggregateInput
    items?: FreezerItemOrderByRelationAggregateInput
  }

  export type FreezerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FreezerWhereInput | FreezerWhereInput[]
    OR?: FreezerWhereInput[]
    NOT?: FreezerWhereInput | FreezerWhereInput[]
    householdId?: StringFilter<"Freezer"> | string
    name?: StringFilter<"Freezer"> | string
    description?: StringNullableFilter<"Freezer"> | string | null
    createdAt?: DateTimeFilter<"Freezer"> | Date | string
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
    compartments?: CompartmentListRelationFilter
    items?: FreezerItemListRelationFilter
  }, "id">

  export type FreezerOrderByWithAggregationInput = {
    id?: SortOrder
    householdId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FreezerCountOrderByAggregateInput
    _max?: FreezerMaxOrderByAggregateInput
    _min?: FreezerMinOrderByAggregateInput
  }

  export type FreezerScalarWhereWithAggregatesInput = {
    AND?: FreezerScalarWhereWithAggregatesInput | FreezerScalarWhereWithAggregatesInput[]
    OR?: FreezerScalarWhereWithAggregatesInput[]
    NOT?: FreezerScalarWhereWithAggregatesInput | FreezerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Freezer"> | string
    householdId?: StringWithAggregatesFilter<"Freezer"> | string
    name?: StringWithAggregatesFilter<"Freezer"> | string
    description?: StringNullableWithAggregatesFilter<"Freezer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Freezer"> | Date | string
  }

  export type CompartmentWhereInput = {
    AND?: CompartmentWhereInput | CompartmentWhereInput[]
    OR?: CompartmentWhereInput[]
    NOT?: CompartmentWhereInput | CompartmentWhereInput[]
    id?: StringFilter<"Compartment"> | string
    freezerId?: StringFilter<"Compartment"> | string
    name?: StringFilter<"Compartment"> | string
    position?: IntFilter<"Compartment"> | number
    freezer?: XOR<FreezerScalarRelationFilter, FreezerWhereInput>
    items?: FreezerItemListRelationFilter
  }

  export type CompartmentOrderByWithRelationInput = {
    id?: SortOrder
    freezerId?: SortOrder
    name?: SortOrder
    position?: SortOrder
    freezer?: FreezerOrderByWithRelationInput
    items?: FreezerItemOrderByRelationAggregateInput
  }

  export type CompartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompartmentWhereInput | CompartmentWhereInput[]
    OR?: CompartmentWhereInput[]
    NOT?: CompartmentWhereInput | CompartmentWhereInput[]
    freezerId?: StringFilter<"Compartment"> | string
    name?: StringFilter<"Compartment"> | string
    position?: IntFilter<"Compartment"> | number
    freezer?: XOR<FreezerScalarRelationFilter, FreezerWhereInput>
    items?: FreezerItemListRelationFilter
  }, "id">

  export type CompartmentOrderByWithAggregationInput = {
    id?: SortOrder
    freezerId?: SortOrder
    name?: SortOrder
    position?: SortOrder
    _count?: CompartmentCountOrderByAggregateInput
    _avg?: CompartmentAvgOrderByAggregateInput
    _max?: CompartmentMaxOrderByAggregateInput
    _min?: CompartmentMinOrderByAggregateInput
    _sum?: CompartmentSumOrderByAggregateInput
  }

  export type CompartmentScalarWhereWithAggregatesInput = {
    AND?: CompartmentScalarWhereWithAggregatesInput | CompartmentScalarWhereWithAggregatesInput[]
    OR?: CompartmentScalarWhereWithAggregatesInput[]
    NOT?: CompartmentScalarWhereWithAggregatesInput | CompartmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Compartment"> | string
    freezerId?: StringWithAggregatesFilter<"Compartment"> | string
    name?: StringWithAggregatesFilter<"Compartment"> | string
    position?: IntWithAggregatesFilter<"Compartment"> | number
  }

  export type FreezerItemWhereInput = {
    AND?: FreezerItemWhereInput | FreezerItemWhereInput[]
    OR?: FreezerItemWhereInput[]
    NOT?: FreezerItemWhereInput | FreezerItemWhereInput[]
    id?: StringFilter<"FreezerItem"> | string
    householdId?: StringFilter<"FreezerItem"> | string
    freezerId?: StringFilter<"FreezerItem"> | string
    compartmentId?: StringFilter<"FreezerItem"> | string
    name?: StringFilter<"FreezerItem"> | string
    quantity?: StringFilter<"FreezerItem"> | string
    notes?: StringNullableFilter<"FreezerItem"> | string | null
    storedAt?: DateTimeFilter<"FreezerItem"> | Date | string
    expiresAt?: DateTimeNullableFilter<"FreezerItem"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"FreezerItem"> | Date | string | null
    createdById?: StringFilter<"FreezerItem"> | string
    updatedById?: StringFilter<"FreezerItem"> | string
    createdAt?: DateTimeFilter<"FreezerItem"> | Date | string
    updatedAt?: DateTimeFilter<"FreezerItem"> | Date | string
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
    freezer?: XOR<FreezerScalarRelationFilter, FreezerWhereInput>
    compartment?: XOR<CompartmentScalarRelationFilter, CompartmentWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    updatedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    changeLogs?: ItemChangeLogListRelationFilter
  }

  export type FreezerItemOrderByWithRelationInput = {
    id?: SortOrder
    householdId?: SortOrder
    freezerId?: SortOrder
    compartmentId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    notes?: SortOrderInput | SortOrder
    storedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    household?: HouseholdOrderByWithRelationInput
    freezer?: FreezerOrderByWithRelationInput
    compartment?: CompartmentOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    updatedBy?: UserOrderByWithRelationInput
    changeLogs?: ItemChangeLogOrderByRelationAggregateInput
  }

  export type FreezerItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FreezerItemWhereInput | FreezerItemWhereInput[]
    OR?: FreezerItemWhereInput[]
    NOT?: FreezerItemWhereInput | FreezerItemWhereInput[]
    householdId?: StringFilter<"FreezerItem"> | string
    freezerId?: StringFilter<"FreezerItem"> | string
    compartmentId?: StringFilter<"FreezerItem"> | string
    name?: StringFilter<"FreezerItem"> | string
    quantity?: StringFilter<"FreezerItem"> | string
    notes?: StringNullableFilter<"FreezerItem"> | string | null
    storedAt?: DateTimeFilter<"FreezerItem"> | Date | string
    expiresAt?: DateTimeNullableFilter<"FreezerItem"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"FreezerItem"> | Date | string | null
    createdById?: StringFilter<"FreezerItem"> | string
    updatedById?: StringFilter<"FreezerItem"> | string
    createdAt?: DateTimeFilter<"FreezerItem"> | Date | string
    updatedAt?: DateTimeFilter<"FreezerItem"> | Date | string
    household?: XOR<HouseholdScalarRelationFilter, HouseholdWhereInput>
    freezer?: XOR<FreezerScalarRelationFilter, FreezerWhereInput>
    compartment?: XOR<CompartmentScalarRelationFilter, CompartmentWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    updatedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    changeLogs?: ItemChangeLogListRelationFilter
  }, "id">

  export type FreezerItemOrderByWithAggregationInput = {
    id?: SortOrder
    householdId?: SortOrder
    freezerId?: SortOrder
    compartmentId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    notes?: SortOrderInput | SortOrder
    storedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FreezerItemCountOrderByAggregateInput
    _max?: FreezerItemMaxOrderByAggregateInput
    _min?: FreezerItemMinOrderByAggregateInput
  }

  export type FreezerItemScalarWhereWithAggregatesInput = {
    AND?: FreezerItemScalarWhereWithAggregatesInput | FreezerItemScalarWhereWithAggregatesInput[]
    OR?: FreezerItemScalarWhereWithAggregatesInput[]
    NOT?: FreezerItemScalarWhereWithAggregatesInput | FreezerItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FreezerItem"> | string
    householdId?: StringWithAggregatesFilter<"FreezerItem"> | string
    freezerId?: StringWithAggregatesFilter<"FreezerItem"> | string
    compartmentId?: StringWithAggregatesFilter<"FreezerItem"> | string
    name?: StringWithAggregatesFilter<"FreezerItem"> | string
    quantity?: StringWithAggregatesFilter<"FreezerItem"> | string
    notes?: StringNullableWithAggregatesFilter<"FreezerItem"> | string | null
    storedAt?: DateTimeWithAggregatesFilter<"FreezerItem"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"FreezerItem"> | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"FreezerItem"> | Date | string | null
    createdById?: StringWithAggregatesFilter<"FreezerItem"> | string
    updatedById?: StringWithAggregatesFilter<"FreezerItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FreezerItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FreezerItem"> | Date | string
  }

  export type ItemChangeLogWhereInput = {
    AND?: ItemChangeLogWhereInput | ItemChangeLogWhereInput[]
    OR?: ItemChangeLogWhereInput[]
    NOT?: ItemChangeLogWhereInput | ItemChangeLogWhereInput[]
    id?: StringFilter<"ItemChangeLog"> | string
    itemId?: StringFilter<"ItemChangeLog"> | string
    changedById?: StringFilter<"ItemChangeLog"> | string
    changedAt?: DateTimeFilter<"ItemChangeLog"> | Date | string
    fieldName?: StringFilter<"ItemChangeLog"> | string
    oldValue?: StringNullableFilter<"ItemChangeLog"> | string | null
    newValue?: StringNullableFilter<"ItemChangeLog"> | string | null
    item?: XOR<FreezerItemScalarRelationFilter, FreezerItemWhereInput>
    changedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ItemChangeLogOrderByWithRelationInput = {
    id?: SortOrder
    itemId?: SortOrder
    changedById?: SortOrder
    changedAt?: SortOrder
    fieldName?: SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    item?: FreezerItemOrderByWithRelationInput
    changedBy?: UserOrderByWithRelationInput
  }

  export type ItemChangeLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ItemChangeLogWhereInput | ItemChangeLogWhereInput[]
    OR?: ItemChangeLogWhereInput[]
    NOT?: ItemChangeLogWhereInput | ItemChangeLogWhereInput[]
    itemId?: StringFilter<"ItemChangeLog"> | string
    changedById?: StringFilter<"ItemChangeLog"> | string
    changedAt?: DateTimeFilter<"ItemChangeLog"> | Date | string
    fieldName?: StringFilter<"ItemChangeLog"> | string
    oldValue?: StringNullableFilter<"ItemChangeLog"> | string | null
    newValue?: StringNullableFilter<"ItemChangeLog"> | string | null
    item?: XOR<FreezerItemScalarRelationFilter, FreezerItemWhereInput>
    changedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ItemChangeLogOrderByWithAggregationInput = {
    id?: SortOrder
    itemId?: SortOrder
    changedById?: SortOrder
    changedAt?: SortOrder
    fieldName?: SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    _count?: ItemChangeLogCountOrderByAggregateInput
    _max?: ItemChangeLogMaxOrderByAggregateInput
    _min?: ItemChangeLogMinOrderByAggregateInput
  }

  export type ItemChangeLogScalarWhereWithAggregatesInput = {
    AND?: ItemChangeLogScalarWhereWithAggregatesInput | ItemChangeLogScalarWhereWithAggregatesInput[]
    OR?: ItemChangeLogScalarWhereWithAggregatesInput[]
    NOT?: ItemChangeLogScalarWhereWithAggregatesInput | ItemChangeLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ItemChangeLog"> | string
    itemId?: StringWithAggregatesFilter<"ItemChangeLog"> | string
    changedById?: StringWithAggregatesFilter<"ItemChangeLog"> | string
    changedAt?: DateTimeWithAggregatesFilter<"ItemChangeLog"> | Date | string
    fieldName?: StringWithAggregatesFilter<"ItemChangeLog"> | string
    oldValue?: StringNullableWithAggregatesFilter<"ItemChangeLog"> | string | null
    newValue?: StringNullableWithAggregatesFilter<"ItemChangeLog"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberCreateNestedManyWithoutUserInput
    ownedHouseholds?: HouseholdCreateNestedManyWithoutOwnerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    createdItems?: FreezerItemCreateNestedManyWithoutCreatedByInput
    updatedItems?: FreezerItemCreateNestedManyWithoutUpdatedByInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberUncheckedCreateNestedManyWithoutUserInput
    ownedHouseholds?: HouseholdUncheckedCreateNestedManyWithoutOwnerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    createdItems?: FreezerItemUncheckedCreateNestedManyWithoutCreatedByInput
    updatedItems?: FreezerItemUncheckedCreateNestedManyWithoutUpdatedByInput
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUpdateManyWithoutUserNestedInput
    ownedHouseholds?: HouseholdUpdateManyWithoutOwnerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    createdItems?: FreezerItemUpdateManyWithoutCreatedByNestedInput
    updatedItems?: FreezerItemUpdateManyWithoutUpdatedByNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedHouseholds?: HouseholdUncheckedUpdateManyWithoutOwnerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    createdItems?: FreezerItemUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedItems?: FreezerItemUncheckedUpdateManyWithoutUpdatedByNestedInput
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedHouseholdsInput
    members?: HouseholdMemberCreateNestedManyWithoutHouseholdInput
    freezers?: FreezerCreateNestedManyWithoutHouseholdInput
    items?: FreezerItemCreateNestedManyWithoutHouseholdInput
    invites?: HouseholdInviteCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    ownerId: string
    members?: HouseholdMemberUncheckedCreateNestedManyWithoutHouseholdInput
    freezers?: FreezerUncheckedCreateNestedManyWithoutHouseholdInput
    items?: FreezerItemUncheckedCreateNestedManyWithoutHouseholdInput
    invites?: HouseholdInviteUncheckedCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedHouseholdsNestedInput
    members?: HouseholdMemberUpdateManyWithoutHouseholdNestedInput
    freezers?: FreezerUpdateManyWithoutHouseholdNestedInput
    items?: FreezerItemUpdateManyWithoutHouseholdNestedInput
    invites?: HouseholdInviteUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    members?: HouseholdMemberUncheckedUpdateManyWithoutHouseholdNestedInput
    freezers?: FreezerUncheckedUpdateManyWithoutHouseholdNestedInput
    items?: FreezerItemUncheckedUpdateManyWithoutHouseholdNestedInput
    invites?: HouseholdInviteUncheckedUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    ownerId: string
  }

  export type HouseholdUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type HouseholdMemberCreateInput = {
    id?: string
    role?: $Enums.HouseholdRole
    joinedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type HouseholdMemberUncheckedCreateInput = {
    id?: string
    householdId: string
    userId: string
    role?: $Enums.HouseholdRole
    joinedAt?: Date | string
  }

  export type HouseholdMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type HouseholdMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdMemberCreateManyInput = {
    id?: string
    householdId: string
    userId: string
    role?: $Enums.HouseholdRole
    joinedAt?: Date | string
  }

  export type HouseholdMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdInviteCreateInput = {
    id?: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    usedByUserId?: string | null
    createdAt?: Date | string
    household: HouseholdCreateNestedOneWithoutInvitesInput
  }

  export type HouseholdInviteUncheckedCreateInput = {
    id?: string
    householdId: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    usedByUserId?: string | null
    createdAt?: Date | string
  }

  export type HouseholdInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutInvitesNestedInput
  }

  export type HouseholdInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdInviteCreateManyInput = {
    id?: string
    householdId: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    usedByUserId?: string | null
    createdAt?: Date | string
  }

  export type HouseholdInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FreezerCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    household: HouseholdCreateNestedOneWithoutFreezersInput
    compartments?: CompartmentCreateNestedManyWithoutFreezerInput
    items?: FreezerItemCreateNestedManyWithoutFreezerInput
  }

  export type FreezerUncheckedCreateInput = {
    id?: string
    householdId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    compartments?: CompartmentUncheckedCreateNestedManyWithoutFreezerInput
    items?: FreezerItemUncheckedCreateNestedManyWithoutFreezerInput
  }

  export type FreezerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutFreezersNestedInput
    compartments?: CompartmentUpdateManyWithoutFreezerNestedInput
    items?: FreezerItemUpdateManyWithoutFreezerNestedInput
  }

  export type FreezerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    compartments?: CompartmentUncheckedUpdateManyWithoutFreezerNestedInput
    items?: FreezerItemUncheckedUpdateManyWithoutFreezerNestedInput
  }

  export type FreezerCreateManyInput = {
    id?: string
    householdId: string
    name: string
    description?: string | null
    createdAt?: Date | string
  }

  export type FreezerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FreezerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompartmentCreateInput = {
    id?: string
    name: string
    position?: number
    freezer: FreezerCreateNestedOneWithoutCompartmentsInput
    items?: FreezerItemCreateNestedManyWithoutCompartmentInput
  }

  export type CompartmentUncheckedCreateInput = {
    id?: string
    freezerId: string
    name: string
    position?: number
    items?: FreezerItemUncheckedCreateNestedManyWithoutCompartmentInput
  }

  export type CompartmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    freezer?: FreezerUpdateOneRequiredWithoutCompartmentsNestedInput
    items?: FreezerItemUpdateManyWithoutCompartmentNestedInput
  }

  export type CompartmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    items?: FreezerItemUncheckedUpdateManyWithoutCompartmentNestedInput
  }

  export type CompartmentCreateManyInput = {
    id?: string
    freezerId: string
    name: string
    position?: number
  }

  export type CompartmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CompartmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type FreezerItemCreateInput = {
    id?: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutItemsInput
    freezer: FreezerCreateNestedOneWithoutItemsInput
    compartment: CompartmentCreateNestedOneWithoutItemsInput
    createdBy: UserCreateNestedOneWithoutCreatedItemsInput
    updatedBy: UserCreateNestedOneWithoutUpdatedItemsInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutItemInput
  }

  export type FreezerItemUncheckedCreateInput = {
    id?: string
    householdId: string
    freezerId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type FreezerItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutItemsNestedInput
    freezer?: FreezerUpdateOneRequiredWithoutItemsNestedInput
    compartment?: CompartmentUpdateOneRequiredWithoutItemsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedItemsNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutUpdatedItemsNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemCreateManyInput = {
    id?: string
    householdId: string
    freezerId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FreezerItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FreezerItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemChangeLogCreateInput = {
    id?: string
    changedAt?: Date | string
    fieldName: string
    oldValue?: string | null
    newValue?: string | null
    item: FreezerItemCreateNestedOneWithoutChangeLogsInput
    changedBy: UserCreateNestedOneWithoutChangeLogsInput
  }

  export type ItemChangeLogUncheckedCreateInput = {
    id?: string
    itemId: string
    changedById: string
    changedAt?: Date | string
    fieldName: string
    oldValue?: string | null
    newValue?: string | null
  }

  export type ItemChangeLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fieldName?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    item?: FreezerItemUpdateOneRequiredWithoutChangeLogsNestedInput
    changedBy?: UserUpdateOneRequiredWithoutChangeLogsNestedInput
  }

  export type ItemChangeLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fieldName?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemChangeLogCreateManyInput = {
    id?: string
    itemId: string
    changedById: string
    changedAt?: Date | string
    fieldName: string
    oldValue?: string | null
    newValue?: string | null
  }

  export type ItemChangeLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fieldName?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemChangeLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fieldName?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type HouseholdMemberListRelationFilter = {
    every?: HouseholdMemberWhereInput
    some?: HouseholdMemberWhereInput
    none?: HouseholdMemberWhereInput
  }

  export type HouseholdListRelationFilter = {
    every?: HouseholdWhereInput
    some?: HouseholdWhereInput
    none?: HouseholdWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type FreezerItemListRelationFilter = {
    every?: FreezerItemWhereInput
    some?: FreezerItemWhereInput
    none?: FreezerItemWhereInput
  }

  export type ItemChangeLogListRelationFilter = {
    every?: ItemChangeLogWhereInput
    some?: ItemChangeLogWhereInput
    none?: ItemChangeLogWhereInput
  }

  export type HouseholdMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HouseholdOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FreezerItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemChangeLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FreezerListRelationFilter = {
    every?: FreezerWhereInput
    some?: FreezerWhereInput
    none?: FreezerWhereInput
  }

  export type HouseholdInviteListRelationFilter = {
    every?: HouseholdInviteWhereInput
    some?: HouseholdInviteWhereInput
    none?: HouseholdInviteWhereInput
  }

  export type FreezerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HouseholdInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HouseholdCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    ownerId?: SortOrder
  }

  export type HouseholdMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    ownerId?: SortOrder
  }

  export type HouseholdMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    ownerId?: SortOrder
  }

  export type EnumHouseholdRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.HouseholdRole | EnumHouseholdRoleFieldRefInput<$PrismaModel>
    in?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumHouseholdRoleFilter<$PrismaModel> | $Enums.HouseholdRole
  }

  export type HouseholdScalarRelationFilter = {
    is?: HouseholdWhereInput
    isNot?: HouseholdWhereInput
  }

  export type HouseholdMemberHouseholdIdUserIdCompoundUniqueInput = {
    householdId: string
    userId: string
  }

  export type HouseholdMemberCountOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type HouseholdMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type HouseholdMemberMinOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type EnumHouseholdRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HouseholdRole | EnumHouseholdRoleFieldRefInput<$PrismaModel>
    in?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumHouseholdRoleWithAggregatesFilter<$PrismaModel> | $Enums.HouseholdRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHouseholdRoleFilter<$PrismaModel>
    _max?: NestedEnumHouseholdRoleFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type HouseholdInviteCountOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    usedByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type HouseholdInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    usedByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type HouseholdInviteMinOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    usedByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CompartmentListRelationFilter = {
    every?: CompartmentWhereInput
    some?: CompartmentWhereInput
    none?: CompartmentWhereInput
  }

  export type CompartmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FreezerCountOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FreezerMaxOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FreezerMinOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FreezerScalarRelationFilter = {
    is?: FreezerWhereInput
    isNot?: FreezerWhereInput
  }

  export type CompartmentCountOrderByAggregateInput = {
    id?: SortOrder
    freezerId?: SortOrder
    name?: SortOrder
    position?: SortOrder
  }

  export type CompartmentAvgOrderByAggregateInput = {
    position?: SortOrder
  }

  export type CompartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    freezerId?: SortOrder
    name?: SortOrder
    position?: SortOrder
  }

  export type CompartmentMinOrderByAggregateInput = {
    id?: SortOrder
    freezerId?: SortOrder
    name?: SortOrder
    position?: SortOrder
  }

  export type CompartmentSumOrderByAggregateInput = {
    position?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CompartmentScalarRelationFilter = {
    is?: CompartmentWhereInput
    isNot?: CompartmentWhereInput
  }

  export type FreezerItemCountOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    freezerId?: SortOrder
    compartmentId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    notes?: SortOrder
    storedAt?: SortOrder
    expiresAt?: SortOrder
    deletedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FreezerItemMaxOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    freezerId?: SortOrder
    compartmentId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    notes?: SortOrder
    storedAt?: SortOrder
    expiresAt?: SortOrder
    deletedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FreezerItemMinOrderByAggregateInput = {
    id?: SortOrder
    householdId?: SortOrder
    freezerId?: SortOrder
    compartmentId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    notes?: SortOrder
    storedAt?: SortOrder
    expiresAt?: SortOrder
    deletedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FreezerItemScalarRelationFilter = {
    is?: FreezerItemWhereInput
    isNot?: FreezerItemWhereInput
  }

  export type ItemChangeLogCountOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    changedById?: SortOrder
    changedAt?: SortOrder
    fieldName?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
  }

  export type ItemChangeLogMaxOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    changedById?: SortOrder
    changedAt?: SortOrder
    fieldName?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
  }

  export type ItemChangeLogMinOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    changedById?: SortOrder
    changedAt?: SortOrder
    fieldName?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
  }

  export type HouseholdMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<HouseholdMemberCreateWithoutUserInput, HouseholdMemberUncheckedCreateWithoutUserInput> | HouseholdMemberCreateWithoutUserInput[] | HouseholdMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HouseholdMemberCreateOrConnectWithoutUserInput | HouseholdMemberCreateOrConnectWithoutUserInput[]
    createMany?: HouseholdMemberCreateManyUserInputEnvelope
    connect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
  }

  export type HouseholdCreateNestedManyWithoutOwnerInput = {
    create?: XOR<HouseholdCreateWithoutOwnerInput, HouseholdUncheckedCreateWithoutOwnerInput> | HouseholdCreateWithoutOwnerInput[] | HouseholdUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: HouseholdCreateOrConnectWithoutOwnerInput | HouseholdCreateOrConnectWithoutOwnerInput[]
    createMany?: HouseholdCreateManyOwnerInputEnvelope
    connect?: HouseholdWhereUniqueInput | HouseholdWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type FreezerItemCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<FreezerItemCreateWithoutCreatedByInput, FreezerItemUncheckedCreateWithoutCreatedByInput> | FreezerItemCreateWithoutCreatedByInput[] | FreezerItemUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutCreatedByInput | FreezerItemCreateOrConnectWithoutCreatedByInput[]
    createMany?: FreezerItemCreateManyCreatedByInputEnvelope
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
  }

  export type FreezerItemCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<FreezerItemCreateWithoutUpdatedByInput, FreezerItemUncheckedCreateWithoutUpdatedByInput> | FreezerItemCreateWithoutUpdatedByInput[] | FreezerItemUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutUpdatedByInput | FreezerItemCreateOrConnectWithoutUpdatedByInput[]
    createMany?: FreezerItemCreateManyUpdatedByInputEnvelope
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
  }

  export type ItemChangeLogCreateNestedManyWithoutChangedByInput = {
    create?: XOR<ItemChangeLogCreateWithoutChangedByInput, ItemChangeLogUncheckedCreateWithoutChangedByInput> | ItemChangeLogCreateWithoutChangedByInput[] | ItemChangeLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: ItemChangeLogCreateOrConnectWithoutChangedByInput | ItemChangeLogCreateOrConnectWithoutChangedByInput[]
    createMany?: ItemChangeLogCreateManyChangedByInputEnvelope
    connect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
  }

  export type HouseholdMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HouseholdMemberCreateWithoutUserInput, HouseholdMemberUncheckedCreateWithoutUserInput> | HouseholdMemberCreateWithoutUserInput[] | HouseholdMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HouseholdMemberCreateOrConnectWithoutUserInput | HouseholdMemberCreateOrConnectWithoutUserInput[]
    createMany?: HouseholdMemberCreateManyUserInputEnvelope
    connect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
  }

  export type HouseholdUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<HouseholdCreateWithoutOwnerInput, HouseholdUncheckedCreateWithoutOwnerInput> | HouseholdCreateWithoutOwnerInput[] | HouseholdUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: HouseholdCreateOrConnectWithoutOwnerInput | HouseholdCreateOrConnectWithoutOwnerInput[]
    createMany?: HouseholdCreateManyOwnerInputEnvelope
    connect?: HouseholdWhereUniqueInput | HouseholdWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type FreezerItemUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<FreezerItemCreateWithoutCreatedByInput, FreezerItemUncheckedCreateWithoutCreatedByInput> | FreezerItemCreateWithoutCreatedByInput[] | FreezerItemUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutCreatedByInput | FreezerItemCreateOrConnectWithoutCreatedByInput[]
    createMany?: FreezerItemCreateManyCreatedByInputEnvelope
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
  }

  export type FreezerItemUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<FreezerItemCreateWithoutUpdatedByInput, FreezerItemUncheckedCreateWithoutUpdatedByInput> | FreezerItemCreateWithoutUpdatedByInput[] | FreezerItemUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutUpdatedByInput | FreezerItemCreateOrConnectWithoutUpdatedByInput[]
    createMany?: FreezerItemCreateManyUpdatedByInputEnvelope
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
  }

  export type ItemChangeLogUncheckedCreateNestedManyWithoutChangedByInput = {
    create?: XOR<ItemChangeLogCreateWithoutChangedByInput, ItemChangeLogUncheckedCreateWithoutChangedByInput> | ItemChangeLogCreateWithoutChangedByInput[] | ItemChangeLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: ItemChangeLogCreateOrConnectWithoutChangedByInput | ItemChangeLogCreateOrConnectWithoutChangedByInput[]
    createMany?: ItemChangeLogCreateManyChangedByInputEnvelope
    connect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type HouseholdMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<HouseholdMemberCreateWithoutUserInput, HouseholdMemberUncheckedCreateWithoutUserInput> | HouseholdMemberCreateWithoutUserInput[] | HouseholdMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HouseholdMemberCreateOrConnectWithoutUserInput | HouseholdMemberCreateOrConnectWithoutUserInput[]
    upsert?: HouseholdMemberUpsertWithWhereUniqueWithoutUserInput | HouseholdMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HouseholdMemberCreateManyUserInputEnvelope
    set?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    disconnect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    delete?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    connect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    update?: HouseholdMemberUpdateWithWhereUniqueWithoutUserInput | HouseholdMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HouseholdMemberUpdateManyWithWhereWithoutUserInput | HouseholdMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HouseholdMemberScalarWhereInput | HouseholdMemberScalarWhereInput[]
  }

  export type HouseholdUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<HouseholdCreateWithoutOwnerInput, HouseholdUncheckedCreateWithoutOwnerInput> | HouseholdCreateWithoutOwnerInput[] | HouseholdUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: HouseholdCreateOrConnectWithoutOwnerInput | HouseholdCreateOrConnectWithoutOwnerInput[]
    upsert?: HouseholdUpsertWithWhereUniqueWithoutOwnerInput | HouseholdUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: HouseholdCreateManyOwnerInputEnvelope
    set?: HouseholdWhereUniqueInput | HouseholdWhereUniqueInput[]
    disconnect?: HouseholdWhereUniqueInput | HouseholdWhereUniqueInput[]
    delete?: HouseholdWhereUniqueInput | HouseholdWhereUniqueInput[]
    connect?: HouseholdWhereUniqueInput | HouseholdWhereUniqueInput[]
    update?: HouseholdUpdateWithWhereUniqueWithoutOwnerInput | HouseholdUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: HouseholdUpdateManyWithWhereWithoutOwnerInput | HouseholdUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: HouseholdScalarWhereInput | HouseholdScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type FreezerItemUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<FreezerItemCreateWithoutCreatedByInput, FreezerItemUncheckedCreateWithoutCreatedByInput> | FreezerItemCreateWithoutCreatedByInput[] | FreezerItemUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutCreatedByInput | FreezerItemCreateOrConnectWithoutCreatedByInput[]
    upsert?: FreezerItemUpsertWithWhereUniqueWithoutCreatedByInput | FreezerItemUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: FreezerItemCreateManyCreatedByInputEnvelope
    set?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    disconnect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    delete?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    update?: FreezerItemUpdateWithWhereUniqueWithoutCreatedByInput | FreezerItemUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: FreezerItemUpdateManyWithWhereWithoutCreatedByInput | FreezerItemUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
  }

  export type FreezerItemUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<FreezerItemCreateWithoutUpdatedByInput, FreezerItemUncheckedCreateWithoutUpdatedByInput> | FreezerItemCreateWithoutUpdatedByInput[] | FreezerItemUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutUpdatedByInput | FreezerItemCreateOrConnectWithoutUpdatedByInput[]
    upsert?: FreezerItemUpsertWithWhereUniqueWithoutUpdatedByInput | FreezerItemUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: FreezerItemCreateManyUpdatedByInputEnvelope
    set?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    disconnect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    delete?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    update?: FreezerItemUpdateWithWhereUniqueWithoutUpdatedByInput | FreezerItemUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: FreezerItemUpdateManyWithWhereWithoutUpdatedByInput | FreezerItemUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
  }

  export type ItemChangeLogUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<ItemChangeLogCreateWithoutChangedByInput, ItemChangeLogUncheckedCreateWithoutChangedByInput> | ItemChangeLogCreateWithoutChangedByInput[] | ItemChangeLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: ItemChangeLogCreateOrConnectWithoutChangedByInput | ItemChangeLogCreateOrConnectWithoutChangedByInput[]
    upsert?: ItemChangeLogUpsertWithWhereUniqueWithoutChangedByInput | ItemChangeLogUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: ItemChangeLogCreateManyChangedByInputEnvelope
    set?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    disconnect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    delete?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    connect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    update?: ItemChangeLogUpdateWithWhereUniqueWithoutChangedByInput | ItemChangeLogUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: ItemChangeLogUpdateManyWithWhereWithoutChangedByInput | ItemChangeLogUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: ItemChangeLogScalarWhereInput | ItemChangeLogScalarWhereInput[]
  }

  export type HouseholdMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HouseholdMemberCreateWithoutUserInput, HouseholdMemberUncheckedCreateWithoutUserInput> | HouseholdMemberCreateWithoutUserInput[] | HouseholdMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HouseholdMemberCreateOrConnectWithoutUserInput | HouseholdMemberCreateOrConnectWithoutUserInput[]
    upsert?: HouseholdMemberUpsertWithWhereUniqueWithoutUserInput | HouseholdMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HouseholdMemberCreateManyUserInputEnvelope
    set?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    disconnect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    delete?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    connect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    update?: HouseholdMemberUpdateWithWhereUniqueWithoutUserInput | HouseholdMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HouseholdMemberUpdateManyWithWhereWithoutUserInput | HouseholdMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HouseholdMemberScalarWhereInput | HouseholdMemberScalarWhereInput[]
  }

  export type HouseholdUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<HouseholdCreateWithoutOwnerInput, HouseholdUncheckedCreateWithoutOwnerInput> | HouseholdCreateWithoutOwnerInput[] | HouseholdUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: HouseholdCreateOrConnectWithoutOwnerInput | HouseholdCreateOrConnectWithoutOwnerInput[]
    upsert?: HouseholdUpsertWithWhereUniqueWithoutOwnerInput | HouseholdUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: HouseholdCreateManyOwnerInputEnvelope
    set?: HouseholdWhereUniqueInput | HouseholdWhereUniqueInput[]
    disconnect?: HouseholdWhereUniqueInput | HouseholdWhereUniqueInput[]
    delete?: HouseholdWhereUniqueInput | HouseholdWhereUniqueInput[]
    connect?: HouseholdWhereUniqueInput | HouseholdWhereUniqueInput[]
    update?: HouseholdUpdateWithWhereUniqueWithoutOwnerInput | HouseholdUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: HouseholdUpdateManyWithWhereWithoutOwnerInput | HouseholdUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: HouseholdScalarWhereInput | HouseholdScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type FreezerItemUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<FreezerItemCreateWithoutCreatedByInput, FreezerItemUncheckedCreateWithoutCreatedByInput> | FreezerItemCreateWithoutCreatedByInput[] | FreezerItemUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutCreatedByInput | FreezerItemCreateOrConnectWithoutCreatedByInput[]
    upsert?: FreezerItemUpsertWithWhereUniqueWithoutCreatedByInput | FreezerItemUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: FreezerItemCreateManyCreatedByInputEnvelope
    set?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    disconnect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    delete?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    update?: FreezerItemUpdateWithWhereUniqueWithoutCreatedByInput | FreezerItemUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: FreezerItemUpdateManyWithWhereWithoutCreatedByInput | FreezerItemUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
  }

  export type FreezerItemUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<FreezerItemCreateWithoutUpdatedByInput, FreezerItemUncheckedCreateWithoutUpdatedByInput> | FreezerItemCreateWithoutUpdatedByInput[] | FreezerItemUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutUpdatedByInput | FreezerItemCreateOrConnectWithoutUpdatedByInput[]
    upsert?: FreezerItemUpsertWithWhereUniqueWithoutUpdatedByInput | FreezerItemUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: FreezerItemCreateManyUpdatedByInputEnvelope
    set?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    disconnect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    delete?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    update?: FreezerItemUpdateWithWhereUniqueWithoutUpdatedByInput | FreezerItemUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: FreezerItemUpdateManyWithWhereWithoutUpdatedByInput | FreezerItemUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
  }

  export type ItemChangeLogUncheckedUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<ItemChangeLogCreateWithoutChangedByInput, ItemChangeLogUncheckedCreateWithoutChangedByInput> | ItemChangeLogCreateWithoutChangedByInput[] | ItemChangeLogUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: ItemChangeLogCreateOrConnectWithoutChangedByInput | ItemChangeLogCreateOrConnectWithoutChangedByInput[]
    upsert?: ItemChangeLogUpsertWithWhereUniqueWithoutChangedByInput | ItemChangeLogUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: ItemChangeLogCreateManyChangedByInputEnvelope
    set?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    disconnect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    delete?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    connect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    update?: ItemChangeLogUpdateWithWhereUniqueWithoutChangedByInput | ItemChangeLogUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: ItemChangeLogUpdateManyWithWhereWithoutChangedByInput | ItemChangeLogUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: ItemChangeLogScalarWhereInput | ItemChangeLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserCreateNestedOneWithoutOwnedHouseholdsInput = {
    create?: XOR<UserCreateWithoutOwnedHouseholdsInput, UserUncheckedCreateWithoutOwnedHouseholdsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedHouseholdsInput
    connect?: UserWhereUniqueInput
  }

  export type HouseholdMemberCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<HouseholdMemberCreateWithoutHouseholdInput, HouseholdMemberUncheckedCreateWithoutHouseholdInput> | HouseholdMemberCreateWithoutHouseholdInput[] | HouseholdMemberUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdMemberCreateOrConnectWithoutHouseholdInput | HouseholdMemberCreateOrConnectWithoutHouseholdInput[]
    createMany?: HouseholdMemberCreateManyHouseholdInputEnvelope
    connect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
  }

  export type FreezerCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<FreezerCreateWithoutHouseholdInput, FreezerUncheckedCreateWithoutHouseholdInput> | FreezerCreateWithoutHouseholdInput[] | FreezerUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: FreezerCreateOrConnectWithoutHouseholdInput | FreezerCreateOrConnectWithoutHouseholdInput[]
    createMany?: FreezerCreateManyHouseholdInputEnvelope
    connect?: FreezerWhereUniqueInput | FreezerWhereUniqueInput[]
  }

  export type FreezerItemCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<FreezerItemCreateWithoutHouseholdInput, FreezerItemUncheckedCreateWithoutHouseholdInput> | FreezerItemCreateWithoutHouseholdInput[] | FreezerItemUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutHouseholdInput | FreezerItemCreateOrConnectWithoutHouseholdInput[]
    createMany?: FreezerItemCreateManyHouseholdInputEnvelope
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
  }

  export type HouseholdInviteCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<HouseholdInviteCreateWithoutHouseholdInput, HouseholdInviteUncheckedCreateWithoutHouseholdInput> | HouseholdInviteCreateWithoutHouseholdInput[] | HouseholdInviteUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdInviteCreateOrConnectWithoutHouseholdInput | HouseholdInviteCreateOrConnectWithoutHouseholdInput[]
    createMany?: HouseholdInviteCreateManyHouseholdInputEnvelope
    connect?: HouseholdInviteWhereUniqueInput | HouseholdInviteWhereUniqueInput[]
  }

  export type HouseholdMemberUncheckedCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<HouseholdMemberCreateWithoutHouseholdInput, HouseholdMemberUncheckedCreateWithoutHouseholdInput> | HouseholdMemberCreateWithoutHouseholdInput[] | HouseholdMemberUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdMemberCreateOrConnectWithoutHouseholdInput | HouseholdMemberCreateOrConnectWithoutHouseholdInput[]
    createMany?: HouseholdMemberCreateManyHouseholdInputEnvelope
    connect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
  }

  export type FreezerUncheckedCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<FreezerCreateWithoutHouseholdInput, FreezerUncheckedCreateWithoutHouseholdInput> | FreezerCreateWithoutHouseholdInput[] | FreezerUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: FreezerCreateOrConnectWithoutHouseholdInput | FreezerCreateOrConnectWithoutHouseholdInput[]
    createMany?: FreezerCreateManyHouseholdInputEnvelope
    connect?: FreezerWhereUniqueInput | FreezerWhereUniqueInput[]
  }

  export type FreezerItemUncheckedCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<FreezerItemCreateWithoutHouseholdInput, FreezerItemUncheckedCreateWithoutHouseholdInput> | FreezerItemCreateWithoutHouseholdInput[] | FreezerItemUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutHouseholdInput | FreezerItemCreateOrConnectWithoutHouseholdInput[]
    createMany?: FreezerItemCreateManyHouseholdInputEnvelope
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
  }

  export type HouseholdInviteUncheckedCreateNestedManyWithoutHouseholdInput = {
    create?: XOR<HouseholdInviteCreateWithoutHouseholdInput, HouseholdInviteUncheckedCreateWithoutHouseholdInput> | HouseholdInviteCreateWithoutHouseholdInput[] | HouseholdInviteUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdInviteCreateOrConnectWithoutHouseholdInput | HouseholdInviteCreateOrConnectWithoutHouseholdInput[]
    createMany?: HouseholdInviteCreateManyHouseholdInputEnvelope
    connect?: HouseholdInviteWhereUniqueInput | HouseholdInviteWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOwnedHouseholdsNestedInput = {
    create?: XOR<UserCreateWithoutOwnedHouseholdsInput, UserUncheckedCreateWithoutOwnedHouseholdsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedHouseholdsInput
    upsert?: UserUpsertWithoutOwnedHouseholdsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedHouseholdsInput, UserUpdateWithoutOwnedHouseholdsInput>, UserUncheckedUpdateWithoutOwnedHouseholdsInput>
  }

  export type HouseholdMemberUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<HouseholdMemberCreateWithoutHouseholdInput, HouseholdMemberUncheckedCreateWithoutHouseholdInput> | HouseholdMemberCreateWithoutHouseholdInput[] | HouseholdMemberUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdMemberCreateOrConnectWithoutHouseholdInput | HouseholdMemberCreateOrConnectWithoutHouseholdInput[]
    upsert?: HouseholdMemberUpsertWithWhereUniqueWithoutHouseholdInput | HouseholdMemberUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: HouseholdMemberCreateManyHouseholdInputEnvelope
    set?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    disconnect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    delete?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    connect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    update?: HouseholdMemberUpdateWithWhereUniqueWithoutHouseholdInput | HouseholdMemberUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: HouseholdMemberUpdateManyWithWhereWithoutHouseholdInput | HouseholdMemberUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: HouseholdMemberScalarWhereInput | HouseholdMemberScalarWhereInput[]
  }

  export type FreezerUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<FreezerCreateWithoutHouseholdInput, FreezerUncheckedCreateWithoutHouseholdInput> | FreezerCreateWithoutHouseholdInput[] | FreezerUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: FreezerCreateOrConnectWithoutHouseholdInput | FreezerCreateOrConnectWithoutHouseholdInput[]
    upsert?: FreezerUpsertWithWhereUniqueWithoutHouseholdInput | FreezerUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: FreezerCreateManyHouseholdInputEnvelope
    set?: FreezerWhereUniqueInput | FreezerWhereUniqueInput[]
    disconnect?: FreezerWhereUniqueInput | FreezerWhereUniqueInput[]
    delete?: FreezerWhereUniqueInput | FreezerWhereUniqueInput[]
    connect?: FreezerWhereUniqueInput | FreezerWhereUniqueInput[]
    update?: FreezerUpdateWithWhereUniqueWithoutHouseholdInput | FreezerUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: FreezerUpdateManyWithWhereWithoutHouseholdInput | FreezerUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: FreezerScalarWhereInput | FreezerScalarWhereInput[]
  }

  export type FreezerItemUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<FreezerItemCreateWithoutHouseholdInput, FreezerItemUncheckedCreateWithoutHouseholdInput> | FreezerItemCreateWithoutHouseholdInput[] | FreezerItemUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutHouseholdInput | FreezerItemCreateOrConnectWithoutHouseholdInput[]
    upsert?: FreezerItemUpsertWithWhereUniqueWithoutHouseholdInput | FreezerItemUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: FreezerItemCreateManyHouseholdInputEnvelope
    set?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    disconnect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    delete?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    update?: FreezerItemUpdateWithWhereUniqueWithoutHouseholdInput | FreezerItemUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: FreezerItemUpdateManyWithWhereWithoutHouseholdInput | FreezerItemUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
  }

  export type HouseholdInviteUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<HouseholdInviteCreateWithoutHouseholdInput, HouseholdInviteUncheckedCreateWithoutHouseholdInput> | HouseholdInviteCreateWithoutHouseholdInput[] | HouseholdInviteUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdInviteCreateOrConnectWithoutHouseholdInput | HouseholdInviteCreateOrConnectWithoutHouseholdInput[]
    upsert?: HouseholdInviteUpsertWithWhereUniqueWithoutHouseholdInput | HouseholdInviteUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: HouseholdInviteCreateManyHouseholdInputEnvelope
    set?: HouseholdInviteWhereUniqueInput | HouseholdInviteWhereUniqueInput[]
    disconnect?: HouseholdInviteWhereUniqueInput | HouseholdInviteWhereUniqueInput[]
    delete?: HouseholdInviteWhereUniqueInput | HouseholdInviteWhereUniqueInput[]
    connect?: HouseholdInviteWhereUniqueInput | HouseholdInviteWhereUniqueInput[]
    update?: HouseholdInviteUpdateWithWhereUniqueWithoutHouseholdInput | HouseholdInviteUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: HouseholdInviteUpdateManyWithWhereWithoutHouseholdInput | HouseholdInviteUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: HouseholdInviteScalarWhereInput | HouseholdInviteScalarWhereInput[]
  }

  export type HouseholdMemberUncheckedUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<HouseholdMemberCreateWithoutHouseholdInput, HouseholdMemberUncheckedCreateWithoutHouseholdInput> | HouseholdMemberCreateWithoutHouseholdInput[] | HouseholdMemberUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdMemberCreateOrConnectWithoutHouseholdInput | HouseholdMemberCreateOrConnectWithoutHouseholdInput[]
    upsert?: HouseholdMemberUpsertWithWhereUniqueWithoutHouseholdInput | HouseholdMemberUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: HouseholdMemberCreateManyHouseholdInputEnvelope
    set?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    disconnect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    delete?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    connect?: HouseholdMemberWhereUniqueInput | HouseholdMemberWhereUniqueInput[]
    update?: HouseholdMemberUpdateWithWhereUniqueWithoutHouseholdInput | HouseholdMemberUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: HouseholdMemberUpdateManyWithWhereWithoutHouseholdInput | HouseholdMemberUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: HouseholdMemberScalarWhereInput | HouseholdMemberScalarWhereInput[]
  }

  export type FreezerUncheckedUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<FreezerCreateWithoutHouseholdInput, FreezerUncheckedCreateWithoutHouseholdInput> | FreezerCreateWithoutHouseholdInput[] | FreezerUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: FreezerCreateOrConnectWithoutHouseholdInput | FreezerCreateOrConnectWithoutHouseholdInput[]
    upsert?: FreezerUpsertWithWhereUniqueWithoutHouseholdInput | FreezerUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: FreezerCreateManyHouseholdInputEnvelope
    set?: FreezerWhereUniqueInput | FreezerWhereUniqueInput[]
    disconnect?: FreezerWhereUniqueInput | FreezerWhereUniqueInput[]
    delete?: FreezerWhereUniqueInput | FreezerWhereUniqueInput[]
    connect?: FreezerWhereUniqueInput | FreezerWhereUniqueInput[]
    update?: FreezerUpdateWithWhereUniqueWithoutHouseholdInput | FreezerUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: FreezerUpdateManyWithWhereWithoutHouseholdInput | FreezerUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: FreezerScalarWhereInput | FreezerScalarWhereInput[]
  }

  export type FreezerItemUncheckedUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<FreezerItemCreateWithoutHouseholdInput, FreezerItemUncheckedCreateWithoutHouseholdInput> | FreezerItemCreateWithoutHouseholdInput[] | FreezerItemUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutHouseholdInput | FreezerItemCreateOrConnectWithoutHouseholdInput[]
    upsert?: FreezerItemUpsertWithWhereUniqueWithoutHouseholdInput | FreezerItemUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: FreezerItemCreateManyHouseholdInputEnvelope
    set?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    disconnect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    delete?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    update?: FreezerItemUpdateWithWhereUniqueWithoutHouseholdInput | FreezerItemUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: FreezerItemUpdateManyWithWhereWithoutHouseholdInput | FreezerItemUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
  }

  export type HouseholdInviteUncheckedUpdateManyWithoutHouseholdNestedInput = {
    create?: XOR<HouseholdInviteCreateWithoutHouseholdInput, HouseholdInviteUncheckedCreateWithoutHouseholdInput> | HouseholdInviteCreateWithoutHouseholdInput[] | HouseholdInviteUncheckedCreateWithoutHouseholdInput[]
    connectOrCreate?: HouseholdInviteCreateOrConnectWithoutHouseholdInput | HouseholdInviteCreateOrConnectWithoutHouseholdInput[]
    upsert?: HouseholdInviteUpsertWithWhereUniqueWithoutHouseholdInput | HouseholdInviteUpsertWithWhereUniqueWithoutHouseholdInput[]
    createMany?: HouseholdInviteCreateManyHouseholdInputEnvelope
    set?: HouseholdInviteWhereUniqueInput | HouseholdInviteWhereUniqueInput[]
    disconnect?: HouseholdInviteWhereUniqueInput | HouseholdInviteWhereUniqueInput[]
    delete?: HouseholdInviteWhereUniqueInput | HouseholdInviteWhereUniqueInput[]
    connect?: HouseholdInviteWhereUniqueInput | HouseholdInviteWhereUniqueInput[]
    update?: HouseholdInviteUpdateWithWhereUniqueWithoutHouseholdInput | HouseholdInviteUpdateWithWhereUniqueWithoutHouseholdInput[]
    updateMany?: HouseholdInviteUpdateManyWithWhereWithoutHouseholdInput | HouseholdInviteUpdateManyWithWhereWithoutHouseholdInput[]
    deleteMany?: HouseholdInviteScalarWhereInput | HouseholdInviteScalarWhereInput[]
  }

  export type HouseholdCreateNestedOneWithoutMembersInput = {
    create?: XOR<HouseholdCreateWithoutMembersInput, HouseholdUncheckedCreateWithoutMembersInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutMembersInput
    connect?: HouseholdWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumHouseholdRoleFieldUpdateOperationsInput = {
    set?: $Enums.HouseholdRole
  }

  export type HouseholdUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<HouseholdCreateWithoutMembersInput, HouseholdUncheckedCreateWithoutMembersInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutMembersInput
    upsert?: HouseholdUpsertWithoutMembersInput
    connect?: HouseholdWhereUniqueInput
    update?: XOR<XOR<HouseholdUpdateToOneWithWhereWithoutMembersInput, HouseholdUpdateWithoutMembersInput>, HouseholdUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type HouseholdCreateNestedOneWithoutInvitesInput = {
    create?: XOR<HouseholdCreateWithoutInvitesInput, HouseholdUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutInvitesInput
    connect?: HouseholdWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type HouseholdUpdateOneRequiredWithoutInvitesNestedInput = {
    create?: XOR<HouseholdCreateWithoutInvitesInput, HouseholdUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutInvitesInput
    upsert?: HouseholdUpsertWithoutInvitesInput
    connect?: HouseholdWhereUniqueInput
    update?: XOR<XOR<HouseholdUpdateToOneWithWhereWithoutInvitesInput, HouseholdUpdateWithoutInvitesInput>, HouseholdUncheckedUpdateWithoutInvitesInput>
  }

  export type HouseholdCreateNestedOneWithoutFreezersInput = {
    create?: XOR<HouseholdCreateWithoutFreezersInput, HouseholdUncheckedCreateWithoutFreezersInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutFreezersInput
    connect?: HouseholdWhereUniqueInput
  }

  export type CompartmentCreateNestedManyWithoutFreezerInput = {
    create?: XOR<CompartmentCreateWithoutFreezerInput, CompartmentUncheckedCreateWithoutFreezerInput> | CompartmentCreateWithoutFreezerInput[] | CompartmentUncheckedCreateWithoutFreezerInput[]
    connectOrCreate?: CompartmentCreateOrConnectWithoutFreezerInput | CompartmentCreateOrConnectWithoutFreezerInput[]
    createMany?: CompartmentCreateManyFreezerInputEnvelope
    connect?: CompartmentWhereUniqueInput | CompartmentWhereUniqueInput[]
  }

  export type FreezerItemCreateNestedManyWithoutFreezerInput = {
    create?: XOR<FreezerItemCreateWithoutFreezerInput, FreezerItemUncheckedCreateWithoutFreezerInput> | FreezerItemCreateWithoutFreezerInput[] | FreezerItemUncheckedCreateWithoutFreezerInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutFreezerInput | FreezerItemCreateOrConnectWithoutFreezerInput[]
    createMany?: FreezerItemCreateManyFreezerInputEnvelope
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
  }

  export type CompartmentUncheckedCreateNestedManyWithoutFreezerInput = {
    create?: XOR<CompartmentCreateWithoutFreezerInput, CompartmentUncheckedCreateWithoutFreezerInput> | CompartmentCreateWithoutFreezerInput[] | CompartmentUncheckedCreateWithoutFreezerInput[]
    connectOrCreate?: CompartmentCreateOrConnectWithoutFreezerInput | CompartmentCreateOrConnectWithoutFreezerInput[]
    createMany?: CompartmentCreateManyFreezerInputEnvelope
    connect?: CompartmentWhereUniqueInput | CompartmentWhereUniqueInput[]
  }

  export type FreezerItemUncheckedCreateNestedManyWithoutFreezerInput = {
    create?: XOR<FreezerItemCreateWithoutFreezerInput, FreezerItemUncheckedCreateWithoutFreezerInput> | FreezerItemCreateWithoutFreezerInput[] | FreezerItemUncheckedCreateWithoutFreezerInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutFreezerInput | FreezerItemCreateOrConnectWithoutFreezerInput[]
    createMany?: FreezerItemCreateManyFreezerInputEnvelope
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
  }

  export type HouseholdUpdateOneRequiredWithoutFreezersNestedInput = {
    create?: XOR<HouseholdCreateWithoutFreezersInput, HouseholdUncheckedCreateWithoutFreezersInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutFreezersInput
    upsert?: HouseholdUpsertWithoutFreezersInput
    connect?: HouseholdWhereUniqueInput
    update?: XOR<XOR<HouseholdUpdateToOneWithWhereWithoutFreezersInput, HouseholdUpdateWithoutFreezersInput>, HouseholdUncheckedUpdateWithoutFreezersInput>
  }

  export type CompartmentUpdateManyWithoutFreezerNestedInput = {
    create?: XOR<CompartmentCreateWithoutFreezerInput, CompartmentUncheckedCreateWithoutFreezerInput> | CompartmentCreateWithoutFreezerInput[] | CompartmentUncheckedCreateWithoutFreezerInput[]
    connectOrCreate?: CompartmentCreateOrConnectWithoutFreezerInput | CompartmentCreateOrConnectWithoutFreezerInput[]
    upsert?: CompartmentUpsertWithWhereUniqueWithoutFreezerInput | CompartmentUpsertWithWhereUniqueWithoutFreezerInput[]
    createMany?: CompartmentCreateManyFreezerInputEnvelope
    set?: CompartmentWhereUniqueInput | CompartmentWhereUniqueInput[]
    disconnect?: CompartmentWhereUniqueInput | CompartmentWhereUniqueInput[]
    delete?: CompartmentWhereUniqueInput | CompartmentWhereUniqueInput[]
    connect?: CompartmentWhereUniqueInput | CompartmentWhereUniqueInput[]
    update?: CompartmentUpdateWithWhereUniqueWithoutFreezerInput | CompartmentUpdateWithWhereUniqueWithoutFreezerInput[]
    updateMany?: CompartmentUpdateManyWithWhereWithoutFreezerInput | CompartmentUpdateManyWithWhereWithoutFreezerInput[]
    deleteMany?: CompartmentScalarWhereInput | CompartmentScalarWhereInput[]
  }

  export type FreezerItemUpdateManyWithoutFreezerNestedInput = {
    create?: XOR<FreezerItemCreateWithoutFreezerInput, FreezerItemUncheckedCreateWithoutFreezerInput> | FreezerItemCreateWithoutFreezerInput[] | FreezerItemUncheckedCreateWithoutFreezerInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutFreezerInput | FreezerItemCreateOrConnectWithoutFreezerInput[]
    upsert?: FreezerItemUpsertWithWhereUniqueWithoutFreezerInput | FreezerItemUpsertWithWhereUniqueWithoutFreezerInput[]
    createMany?: FreezerItemCreateManyFreezerInputEnvelope
    set?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    disconnect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    delete?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    update?: FreezerItemUpdateWithWhereUniqueWithoutFreezerInput | FreezerItemUpdateWithWhereUniqueWithoutFreezerInput[]
    updateMany?: FreezerItemUpdateManyWithWhereWithoutFreezerInput | FreezerItemUpdateManyWithWhereWithoutFreezerInput[]
    deleteMany?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
  }

  export type CompartmentUncheckedUpdateManyWithoutFreezerNestedInput = {
    create?: XOR<CompartmentCreateWithoutFreezerInput, CompartmentUncheckedCreateWithoutFreezerInput> | CompartmentCreateWithoutFreezerInput[] | CompartmentUncheckedCreateWithoutFreezerInput[]
    connectOrCreate?: CompartmentCreateOrConnectWithoutFreezerInput | CompartmentCreateOrConnectWithoutFreezerInput[]
    upsert?: CompartmentUpsertWithWhereUniqueWithoutFreezerInput | CompartmentUpsertWithWhereUniqueWithoutFreezerInput[]
    createMany?: CompartmentCreateManyFreezerInputEnvelope
    set?: CompartmentWhereUniqueInput | CompartmentWhereUniqueInput[]
    disconnect?: CompartmentWhereUniqueInput | CompartmentWhereUniqueInput[]
    delete?: CompartmentWhereUniqueInput | CompartmentWhereUniqueInput[]
    connect?: CompartmentWhereUniqueInput | CompartmentWhereUniqueInput[]
    update?: CompartmentUpdateWithWhereUniqueWithoutFreezerInput | CompartmentUpdateWithWhereUniqueWithoutFreezerInput[]
    updateMany?: CompartmentUpdateManyWithWhereWithoutFreezerInput | CompartmentUpdateManyWithWhereWithoutFreezerInput[]
    deleteMany?: CompartmentScalarWhereInput | CompartmentScalarWhereInput[]
  }

  export type FreezerItemUncheckedUpdateManyWithoutFreezerNestedInput = {
    create?: XOR<FreezerItemCreateWithoutFreezerInput, FreezerItemUncheckedCreateWithoutFreezerInput> | FreezerItemCreateWithoutFreezerInput[] | FreezerItemUncheckedCreateWithoutFreezerInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutFreezerInput | FreezerItemCreateOrConnectWithoutFreezerInput[]
    upsert?: FreezerItemUpsertWithWhereUniqueWithoutFreezerInput | FreezerItemUpsertWithWhereUniqueWithoutFreezerInput[]
    createMany?: FreezerItemCreateManyFreezerInputEnvelope
    set?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    disconnect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    delete?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    update?: FreezerItemUpdateWithWhereUniqueWithoutFreezerInput | FreezerItemUpdateWithWhereUniqueWithoutFreezerInput[]
    updateMany?: FreezerItemUpdateManyWithWhereWithoutFreezerInput | FreezerItemUpdateManyWithWhereWithoutFreezerInput[]
    deleteMany?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
  }

  export type FreezerCreateNestedOneWithoutCompartmentsInput = {
    create?: XOR<FreezerCreateWithoutCompartmentsInput, FreezerUncheckedCreateWithoutCompartmentsInput>
    connectOrCreate?: FreezerCreateOrConnectWithoutCompartmentsInput
    connect?: FreezerWhereUniqueInput
  }

  export type FreezerItemCreateNestedManyWithoutCompartmentInput = {
    create?: XOR<FreezerItemCreateWithoutCompartmentInput, FreezerItemUncheckedCreateWithoutCompartmentInput> | FreezerItemCreateWithoutCompartmentInput[] | FreezerItemUncheckedCreateWithoutCompartmentInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutCompartmentInput | FreezerItemCreateOrConnectWithoutCompartmentInput[]
    createMany?: FreezerItemCreateManyCompartmentInputEnvelope
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
  }

  export type FreezerItemUncheckedCreateNestedManyWithoutCompartmentInput = {
    create?: XOR<FreezerItemCreateWithoutCompartmentInput, FreezerItemUncheckedCreateWithoutCompartmentInput> | FreezerItemCreateWithoutCompartmentInput[] | FreezerItemUncheckedCreateWithoutCompartmentInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutCompartmentInput | FreezerItemCreateOrConnectWithoutCompartmentInput[]
    createMany?: FreezerItemCreateManyCompartmentInputEnvelope
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FreezerUpdateOneRequiredWithoutCompartmentsNestedInput = {
    create?: XOR<FreezerCreateWithoutCompartmentsInput, FreezerUncheckedCreateWithoutCompartmentsInput>
    connectOrCreate?: FreezerCreateOrConnectWithoutCompartmentsInput
    upsert?: FreezerUpsertWithoutCompartmentsInput
    connect?: FreezerWhereUniqueInput
    update?: XOR<XOR<FreezerUpdateToOneWithWhereWithoutCompartmentsInput, FreezerUpdateWithoutCompartmentsInput>, FreezerUncheckedUpdateWithoutCompartmentsInput>
  }

  export type FreezerItemUpdateManyWithoutCompartmentNestedInput = {
    create?: XOR<FreezerItemCreateWithoutCompartmentInput, FreezerItemUncheckedCreateWithoutCompartmentInput> | FreezerItemCreateWithoutCompartmentInput[] | FreezerItemUncheckedCreateWithoutCompartmentInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutCompartmentInput | FreezerItemCreateOrConnectWithoutCompartmentInput[]
    upsert?: FreezerItemUpsertWithWhereUniqueWithoutCompartmentInput | FreezerItemUpsertWithWhereUniqueWithoutCompartmentInput[]
    createMany?: FreezerItemCreateManyCompartmentInputEnvelope
    set?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    disconnect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    delete?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    update?: FreezerItemUpdateWithWhereUniqueWithoutCompartmentInput | FreezerItemUpdateWithWhereUniqueWithoutCompartmentInput[]
    updateMany?: FreezerItemUpdateManyWithWhereWithoutCompartmentInput | FreezerItemUpdateManyWithWhereWithoutCompartmentInput[]
    deleteMany?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
  }

  export type FreezerItemUncheckedUpdateManyWithoutCompartmentNestedInput = {
    create?: XOR<FreezerItemCreateWithoutCompartmentInput, FreezerItemUncheckedCreateWithoutCompartmentInput> | FreezerItemCreateWithoutCompartmentInput[] | FreezerItemUncheckedCreateWithoutCompartmentInput[]
    connectOrCreate?: FreezerItemCreateOrConnectWithoutCompartmentInput | FreezerItemCreateOrConnectWithoutCompartmentInput[]
    upsert?: FreezerItemUpsertWithWhereUniqueWithoutCompartmentInput | FreezerItemUpsertWithWhereUniqueWithoutCompartmentInput[]
    createMany?: FreezerItemCreateManyCompartmentInputEnvelope
    set?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    disconnect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    delete?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    connect?: FreezerItemWhereUniqueInput | FreezerItemWhereUniqueInput[]
    update?: FreezerItemUpdateWithWhereUniqueWithoutCompartmentInput | FreezerItemUpdateWithWhereUniqueWithoutCompartmentInput[]
    updateMany?: FreezerItemUpdateManyWithWhereWithoutCompartmentInput | FreezerItemUpdateManyWithWhereWithoutCompartmentInput[]
    deleteMany?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
  }

  export type HouseholdCreateNestedOneWithoutItemsInput = {
    create?: XOR<HouseholdCreateWithoutItemsInput, HouseholdUncheckedCreateWithoutItemsInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutItemsInput
    connect?: HouseholdWhereUniqueInput
  }

  export type FreezerCreateNestedOneWithoutItemsInput = {
    create?: XOR<FreezerCreateWithoutItemsInput, FreezerUncheckedCreateWithoutItemsInput>
    connectOrCreate?: FreezerCreateOrConnectWithoutItemsInput
    connect?: FreezerWhereUniqueInput
  }

  export type CompartmentCreateNestedOneWithoutItemsInput = {
    create?: XOR<CompartmentCreateWithoutItemsInput, CompartmentUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CompartmentCreateOrConnectWithoutItemsInput
    connect?: CompartmentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedItemsInput = {
    create?: XOR<UserCreateWithoutCreatedItemsInput, UserUncheckedCreateWithoutCreatedItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedItemsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUpdatedItemsInput = {
    create?: XOR<UserCreateWithoutUpdatedItemsInput, UserUncheckedCreateWithoutUpdatedItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedItemsInput
    connect?: UserWhereUniqueInput
  }

  export type ItemChangeLogCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemChangeLogCreateWithoutItemInput, ItemChangeLogUncheckedCreateWithoutItemInput> | ItemChangeLogCreateWithoutItemInput[] | ItemChangeLogUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemChangeLogCreateOrConnectWithoutItemInput | ItemChangeLogCreateOrConnectWithoutItemInput[]
    createMany?: ItemChangeLogCreateManyItemInputEnvelope
    connect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
  }

  export type ItemChangeLogUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemChangeLogCreateWithoutItemInput, ItemChangeLogUncheckedCreateWithoutItemInput> | ItemChangeLogCreateWithoutItemInput[] | ItemChangeLogUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemChangeLogCreateOrConnectWithoutItemInput | ItemChangeLogCreateOrConnectWithoutItemInput[]
    createMany?: ItemChangeLogCreateManyItemInputEnvelope
    connect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
  }

  export type HouseholdUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<HouseholdCreateWithoutItemsInput, HouseholdUncheckedCreateWithoutItemsInput>
    connectOrCreate?: HouseholdCreateOrConnectWithoutItemsInput
    upsert?: HouseholdUpsertWithoutItemsInput
    connect?: HouseholdWhereUniqueInput
    update?: XOR<XOR<HouseholdUpdateToOneWithWhereWithoutItemsInput, HouseholdUpdateWithoutItemsInput>, HouseholdUncheckedUpdateWithoutItemsInput>
  }

  export type FreezerUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<FreezerCreateWithoutItemsInput, FreezerUncheckedCreateWithoutItemsInput>
    connectOrCreate?: FreezerCreateOrConnectWithoutItemsInput
    upsert?: FreezerUpsertWithoutItemsInput
    connect?: FreezerWhereUniqueInput
    update?: XOR<XOR<FreezerUpdateToOneWithWhereWithoutItemsInput, FreezerUpdateWithoutItemsInput>, FreezerUncheckedUpdateWithoutItemsInput>
  }

  export type CompartmentUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<CompartmentCreateWithoutItemsInput, CompartmentUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CompartmentCreateOrConnectWithoutItemsInput
    upsert?: CompartmentUpsertWithoutItemsInput
    connect?: CompartmentWhereUniqueInput
    update?: XOR<XOR<CompartmentUpdateToOneWithWhereWithoutItemsInput, CompartmentUpdateWithoutItemsInput>, CompartmentUncheckedUpdateWithoutItemsInput>
  }

  export type UserUpdateOneRequiredWithoutCreatedItemsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedItemsInput, UserUncheckedCreateWithoutCreatedItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedItemsInput
    upsert?: UserUpsertWithoutCreatedItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedItemsInput, UserUpdateWithoutCreatedItemsInput>, UserUncheckedUpdateWithoutCreatedItemsInput>
  }

  export type UserUpdateOneRequiredWithoutUpdatedItemsNestedInput = {
    create?: XOR<UserCreateWithoutUpdatedItemsInput, UserUncheckedCreateWithoutUpdatedItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedItemsInput
    upsert?: UserUpsertWithoutUpdatedItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUpdatedItemsInput, UserUpdateWithoutUpdatedItemsInput>, UserUncheckedUpdateWithoutUpdatedItemsInput>
  }

  export type ItemChangeLogUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemChangeLogCreateWithoutItemInput, ItemChangeLogUncheckedCreateWithoutItemInput> | ItemChangeLogCreateWithoutItemInput[] | ItemChangeLogUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemChangeLogCreateOrConnectWithoutItemInput | ItemChangeLogCreateOrConnectWithoutItemInput[]
    upsert?: ItemChangeLogUpsertWithWhereUniqueWithoutItemInput | ItemChangeLogUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemChangeLogCreateManyItemInputEnvelope
    set?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    disconnect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    delete?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    connect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    update?: ItemChangeLogUpdateWithWhereUniqueWithoutItemInput | ItemChangeLogUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemChangeLogUpdateManyWithWhereWithoutItemInput | ItemChangeLogUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemChangeLogScalarWhereInput | ItemChangeLogScalarWhereInput[]
  }

  export type ItemChangeLogUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemChangeLogCreateWithoutItemInput, ItemChangeLogUncheckedCreateWithoutItemInput> | ItemChangeLogCreateWithoutItemInput[] | ItemChangeLogUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemChangeLogCreateOrConnectWithoutItemInput | ItemChangeLogCreateOrConnectWithoutItemInput[]
    upsert?: ItemChangeLogUpsertWithWhereUniqueWithoutItemInput | ItemChangeLogUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemChangeLogCreateManyItemInputEnvelope
    set?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    disconnect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    delete?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    connect?: ItemChangeLogWhereUniqueInput | ItemChangeLogWhereUniqueInput[]
    update?: ItemChangeLogUpdateWithWhereUniqueWithoutItemInput | ItemChangeLogUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemChangeLogUpdateManyWithWhereWithoutItemInput | ItemChangeLogUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemChangeLogScalarWhereInput | ItemChangeLogScalarWhereInput[]
  }

  export type FreezerItemCreateNestedOneWithoutChangeLogsInput = {
    create?: XOR<FreezerItemCreateWithoutChangeLogsInput, FreezerItemUncheckedCreateWithoutChangeLogsInput>
    connectOrCreate?: FreezerItemCreateOrConnectWithoutChangeLogsInput
    connect?: FreezerItemWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutChangeLogsInput = {
    create?: XOR<UserCreateWithoutChangeLogsInput, UserUncheckedCreateWithoutChangeLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChangeLogsInput
    connect?: UserWhereUniqueInput
  }

  export type FreezerItemUpdateOneRequiredWithoutChangeLogsNestedInput = {
    create?: XOR<FreezerItemCreateWithoutChangeLogsInput, FreezerItemUncheckedCreateWithoutChangeLogsInput>
    connectOrCreate?: FreezerItemCreateOrConnectWithoutChangeLogsInput
    upsert?: FreezerItemUpsertWithoutChangeLogsInput
    connect?: FreezerItemWhereUniqueInput
    update?: XOR<XOR<FreezerItemUpdateToOneWithWhereWithoutChangeLogsInput, FreezerItemUpdateWithoutChangeLogsInput>, FreezerItemUncheckedUpdateWithoutChangeLogsInput>
  }

  export type UserUpdateOneRequiredWithoutChangeLogsNestedInput = {
    create?: XOR<UserCreateWithoutChangeLogsInput, UserUncheckedCreateWithoutChangeLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChangeLogsInput
    upsert?: UserUpsertWithoutChangeLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChangeLogsInput, UserUpdateWithoutChangeLogsInput>, UserUncheckedUpdateWithoutChangeLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumHouseholdRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.HouseholdRole | EnumHouseholdRoleFieldRefInput<$PrismaModel>
    in?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumHouseholdRoleFilter<$PrismaModel> | $Enums.HouseholdRole
  }

  export type NestedEnumHouseholdRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HouseholdRole | EnumHouseholdRoleFieldRefInput<$PrismaModel>
    in?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.HouseholdRole[] | ListEnumHouseholdRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumHouseholdRoleWithAggregatesFilter<$PrismaModel> | $Enums.HouseholdRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHouseholdRoleFilter<$PrismaModel>
    _max?: NestedEnumHouseholdRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type HouseholdMemberCreateWithoutUserInput = {
    id?: string
    role?: $Enums.HouseholdRole
    joinedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutMembersInput
  }

  export type HouseholdMemberUncheckedCreateWithoutUserInput = {
    id?: string
    householdId: string
    role?: $Enums.HouseholdRole
    joinedAt?: Date | string
  }

  export type HouseholdMemberCreateOrConnectWithoutUserInput = {
    where: HouseholdMemberWhereUniqueInput
    create: XOR<HouseholdMemberCreateWithoutUserInput, HouseholdMemberUncheckedCreateWithoutUserInput>
  }

  export type HouseholdMemberCreateManyUserInputEnvelope = {
    data: HouseholdMemberCreateManyUserInput | HouseholdMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HouseholdCreateWithoutOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    members?: HouseholdMemberCreateNestedManyWithoutHouseholdInput
    freezers?: FreezerCreateNestedManyWithoutHouseholdInput
    items?: FreezerItemCreateNestedManyWithoutHouseholdInput
    invites?: HouseholdInviteCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    members?: HouseholdMemberUncheckedCreateNestedManyWithoutHouseholdInput
    freezers?: FreezerUncheckedCreateNestedManyWithoutHouseholdInput
    items?: FreezerItemUncheckedCreateNestedManyWithoutHouseholdInput
    invites?: HouseholdInviteUncheckedCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdCreateOrConnectWithoutOwnerInput = {
    where: HouseholdWhereUniqueInput
    create: XOR<HouseholdCreateWithoutOwnerInput, HouseholdUncheckedCreateWithoutOwnerInput>
  }

  export type HouseholdCreateManyOwnerInputEnvelope = {
    data: HouseholdCreateManyOwnerInput | HouseholdCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FreezerItemCreateWithoutCreatedByInput = {
    id?: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutItemsInput
    freezer: FreezerCreateNestedOneWithoutItemsInput
    compartment: CompartmentCreateNestedOneWithoutItemsInput
    updatedBy: UserCreateNestedOneWithoutUpdatedItemsInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutItemInput
  }

  export type FreezerItemUncheckedCreateWithoutCreatedByInput = {
    id?: string
    householdId: string
    freezerId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type FreezerItemCreateOrConnectWithoutCreatedByInput = {
    where: FreezerItemWhereUniqueInput
    create: XOR<FreezerItemCreateWithoutCreatedByInput, FreezerItemUncheckedCreateWithoutCreatedByInput>
  }

  export type FreezerItemCreateManyCreatedByInputEnvelope = {
    data: FreezerItemCreateManyCreatedByInput | FreezerItemCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type FreezerItemCreateWithoutUpdatedByInput = {
    id?: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutItemsInput
    freezer: FreezerCreateNestedOneWithoutItemsInput
    compartment: CompartmentCreateNestedOneWithoutItemsInput
    createdBy: UserCreateNestedOneWithoutCreatedItemsInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutItemInput
  }

  export type FreezerItemUncheckedCreateWithoutUpdatedByInput = {
    id?: string
    householdId: string
    freezerId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type FreezerItemCreateOrConnectWithoutUpdatedByInput = {
    where: FreezerItemWhereUniqueInput
    create: XOR<FreezerItemCreateWithoutUpdatedByInput, FreezerItemUncheckedCreateWithoutUpdatedByInput>
  }

  export type FreezerItemCreateManyUpdatedByInputEnvelope = {
    data: FreezerItemCreateManyUpdatedByInput | FreezerItemCreateManyUpdatedByInput[]
    skipDuplicates?: boolean
  }

  export type ItemChangeLogCreateWithoutChangedByInput = {
    id?: string
    changedAt?: Date | string
    fieldName: string
    oldValue?: string | null
    newValue?: string | null
    item: FreezerItemCreateNestedOneWithoutChangeLogsInput
  }

  export type ItemChangeLogUncheckedCreateWithoutChangedByInput = {
    id?: string
    itemId: string
    changedAt?: Date | string
    fieldName: string
    oldValue?: string | null
    newValue?: string | null
  }

  export type ItemChangeLogCreateOrConnectWithoutChangedByInput = {
    where: ItemChangeLogWhereUniqueInput
    create: XOR<ItemChangeLogCreateWithoutChangedByInput, ItemChangeLogUncheckedCreateWithoutChangedByInput>
  }

  export type ItemChangeLogCreateManyChangedByInputEnvelope = {
    data: ItemChangeLogCreateManyChangedByInput | ItemChangeLogCreateManyChangedByInput[]
    skipDuplicates?: boolean
  }

  export type HouseholdMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: HouseholdMemberWhereUniqueInput
    update: XOR<HouseholdMemberUpdateWithoutUserInput, HouseholdMemberUncheckedUpdateWithoutUserInput>
    create: XOR<HouseholdMemberCreateWithoutUserInput, HouseholdMemberUncheckedCreateWithoutUserInput>
  }

  export type HouseholdMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: HouseholdMemberWhereUniqueInput
    data: XOR<HouseholdMemberUpdateWithoutUserInput, HouseholdMemberUncheckedUpdateWithoutUserInput>
  }

  export type HouseholdMemberUpdateManyWithWhereWithoutUserInput = {
    where: HouseholdMemberScalarWhereInput
    data: XOR<HouseholdMemberUpdateManyMutationInput, HouseholdMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type HouseholdMemberScalarWhereInput = {
    AND?: HouseholdMemberScalarWhereInput | HouseholdMemberScalarWhereInput[]
    OR?: HouseholdMemberScalarWhereInput[]
    NOT?: HouseholdMemberScalarWhereInput | HouseholdMemberScalarWhereInput[]
    id?: StringFilter<"HouseholdMember"> | string
    householdId?: StringFilter<"HouseholdMember"> | string
    userId?: StringFilter<"HouseholdMember"> | string
    role?: EnumHouseholdRoleFilter<"HouseholdMember"> | $Enums.HouseholdRole
    joinedAt?: DateTimeFilter<"HouseholdMember"> | Date | string
  }

  export type HouseholdUpsertWithWhereUniqueWithoutOwnerInput = {
    where: HouseholdWhereUniqueInput
    update: XOR<HouseholdUpdateWithoutOwnerInput, HouseholdUncheckedUpdateWithoutOwnerInput>
    create: XOR<HouseholdCreateWithoutOwnerInput, HouseholdUncheckedCreateWithoutOwnerInput>
  }

  export type HouseholdUpdateWithWhereUniqueWithoutOwnerInput = {
    where: HouseholdWhereUniqueInput
    data: XOR<HouseholdUpdateWithoutOwnerInput, HouseholdUncheckedUpdateWithoutOwnerInput>
  }

  export type HouseholdUpdateManyWithWhereWithoutOwnerInput = {
    where: HouseholdScalarWhereInput
    data: XOR<HouseholdUpdateManyMutationInput, HouseholdUncheckedUpdateManyWithoutOwnerInput>
  }

  export type HouseholdScalarWhereInput = {
    AND?: HouseholdScalarWhereInput | HouseholdScalarWhereInput[]
    OR?: HouseholdScalarWhereInput[]
    NOT?: HouseholdScalarWhereInput | HouseholdScalarWhereInput[]
    id?: StringFilter<"Household"> | string
    name?: StringFilter<"Household"> | string
    createdAt?: DateTimeFilter<"Household"> | Date | string
    ownerId?: StringFilter<"Household"> | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type FreezerItemUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: FreezerItemWhereUniqueInput
    update: XOR<FreezerItemUpdateWithoutCreatedByInput, FreezerItemUncheckedUpdateWithoutCreatedByInput>
    create: XOR<FreezerItemCreateWithoutCreatedByInput, FreezerItemUncheckedCreateWithoutCreatedByInput>
  }

  export type FreezerItemUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: FreezerItemWhereUniqueInput
    data: XOR<FreezerItemUpdateWithoutCreatedByInput, FreezerItemUncheckedUpdateWithoutCreatedByInput>
  }

  export type FreezerItemUpdateManyWithWhereWithoutCreatedByInput = {
    where: FreezerItemScalarWhereInput
    data: XOR<FreezerItemUpdateManyMutationInput, FreezerItemUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type FreezerItemScalarWhereInput = {
    AND?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
    OR?: FreezerItemScalarWhereInput[]
    NOT?: FreezerItemScalarWhereInput | FreezerItemScalarWhereInput[]
    id?: StringFilter<"FreezerItem"> | string
    householdId?: StringFilter<"FreezerItem"> | string
    freezerId?: StringFilter<"FreezerItem"> | string
    compartmentId?: StringFilter<"FreezerItem"> | string
    name?: StringFilter<"FreezerItem"> | string
    quantity?: StringFilter<"FreezerItem"> | string
    notes?: StringNullableFilter<"FreezerItem"> | string | null
    storedAt?: DateTimeFilter<"FreezerItem"> | Date | string
    expiresAt?: DateTimeNullableFilter<"FreezerItem"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"FreezerItem"> | Date | string | null
    createdById?: StringFilter<"FreezerItem"> | string
    updatedById?: StringFilter<"FreezerItem"> | string
    createdAt?: DateTimeFilter<"FreezerItem"> | Date | string
    updatedAt?: DateTimeFilter<"FreezerItem"> | Date | string
  }

  export type FreezerItemUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: FreezerItemWhereUniqueInput
    update: XOR<FreezerItemUpdateWithoutUpdatedByInput, FreezerItemUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<FreezerItemCreateWithoutUpdatedByInput, FreezerItemUncheckedCreateWithoutUpdatedByInput>
  }

  export type FreezerItemUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: FreezerItemWhereUniqueInput
    data: XOR<FreezerItemUpdateWithoutUpdatedByInput, FreezerItemUncheckedUpdateWithoutUpdatedByInput>
  }

  export type FreezerItemUpdateManyWithWhereWithoutUpdatedByInput = {
    where: FreezerItemScalarWhereInput
    data: XOR<FreezerItemUpdateManyMutationInput, FreezerItemUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type ItemChangeLogUpsertWithWhereUniqueWithoutChangedByInput = {
    where: ItemChangeLogWhereUniqueInput
    update: XOR<ItemChangeLogUpdateWithoutChangedByInput, ItemChangeLogUncheckedUpdateWithoutChangedByInput>
    create: XOR<ItemChangeLogCreateWithoutChangedByInput, ItemChangeLogUncheckedCreateWithoutChangedByInput>
  }

  export type ItemChangeLogUpdateWithWhereUniqueWithoutChangedByInput = {
    where: ItemChangeLogWhereUniqueInput
    data: XOR<ItemChangeLogUpdateWithoutChangedByInput, ItemChangeLogUncheckedUpdateWithoutChangedByInput>
  }

  export type ItemChangeLogUpdateManyWithWhereWithoutChangedByInput = {
    where: ItemChangeLogScalarWhereInput
    data: XOR<ItemChangeLogUpdateManyMutationInput, ItemChangeLogUncheckedUpdateManyWithoutChangedByInput>
  }

  export type ItemChangeLogScalarWhereInput = {
    AND?: ItemChangeLogScalarWhereInput | ItemChangeLogScalarWhereInput[]
    OR?: ItemChangeLogScalarWhereInput[]
    NOT?: ItemChangeLogScalarWhereInput | ItemChangeLogScalarWhereInput[]
    id?: StringFilter<"ItemChangeLog"> | string
    itemId?: StringFilter<"ItemChangeLog"> | string
    changedById?: StringFilter<"ItemChangeLog"> | string
    changedAt?: DateTimeFilter<"ItemChangeLog"> | Date | string
    fieldName?: StringFilter<"ItemChangeLog"> | string
    oldValue?: StringNullableFilter<"ItemChangeLog"> | string | null
    newValue?: StringNullableFilter<"ItemChangeLog"> | string | null
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberCreateNestedManyWithoutUserInput
    ownedHouseholds?: HouseholdCreateNestedManyWithoutOwnerInput
    createdItems?: FreezerItemCreateNestedManyWithoutCreatedByInput
    updatedItems?: FreezerItemCreateNestedManyWithoutUpdatedByInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberUncheckedCreateNestedManyWithoutUserInput
    ownedHouseholds?: HouseholdUncheckedCreateNestedManyWithoutOwnerInput
    createdItems?: FreezerItemUncheckedCreateNestedManyWithoutCreatedByInput
    updatedItems?: FreezerItemUncheckedCreateNestedManyWithoutUpdatedByInput
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUpdateManyWithoutUserNestedInput
    ownedHouseholds?: HouseholdUpdateManyWithoutOwnerNestedInput
    createdItems?: FreezerItemUpdateManyWithoutCreatedByNestedInput
    updatedItems?: FreezerItemUpdateManyWithoutUpdatedByNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedHouseholds?: HouseholdUncheckedUpdateManyWithoutOwnerNestedInput
    createdItems?: FreezerItemUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedItems?: FreezerItemUncheckedUpdateManyWithoutUpdatedByNestedInput
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type UserCreateWithoutOwnedHouseholdsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    createdItems?: FreezerItemCreateNestedManyWithoutCreatedByInput
    updatedItems?: FreezerItemCreateNestedManyWithoutUpdatedByInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutOwnedHouseholdsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    createdItems?: FreezerItemUncheckedCreateNestedManyWithoutCreatedByInput
    updatedItems?: FreezerItemUncheckedCreateNestedManyWithoutUpdatedByInput
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutOwnedHouseholdsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedHouseholdsInput, UserUncheckedCreateWithoutOwnedHouseholdsInput>
  }

  export type HouseholdMemberCreateWithoutHouseholdInput = {
    id?: string
    role?: $Enums.HouseholdRole
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type HouseholdMemberUncheckedCreateWithoutHouseholdInput = {
    id?: string
    userId: string
    role?: $Enums.HouseholdRole
    joinedAt?: Date | string
  }

  export type HouseholdMemberCreateOrConnectWithoutHouseholdInput = {
    where: HouseholdMemberWhereUniqueInput
    create: XOR<HouseholdMemberCreateWithoutHouseholdInput, HouseholdMemberUncheckedCreateWithoutHouseholdInput>
  }

  export type HouseholdMemberCreateManyHouseholdInputEnvelope = {
    data: HouseholdMemberCreateManyHouseholdInput | HouseholdMemberCreateManyHouseholdInput[]
    skipDuplicates?: boolean
  }

  export type FreezerCreateWithoutHouseholdInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    compartments?: CompartmentCreateNestedManyWithoutFreezerInput
    items?: FreezerItemCreateNestedManyWithoutFreezerInput
  }

  export type FreezerUncheckedCreateWithoutHouseholdInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    compartments?: CompartmentUncheckedCreateNestedManyWithoutFreezerInput
    items?: FreezerItemUncheckedCreateNestedManyWithoutFreezerInput
  }

  export type FreezerCreateOrConnectWithoutHouseholdInput = {
    where: FreezerWhereUniqueInput
    create: XOR<FreezerCreateWithoutHouseholdInput, FreezerUncheckedCreateWithoutHouseholdInput>
  }

  export type FreezerCreateManyHouseholdInputEnvelope = {
    data: FreezerCreateManyHouseholdInput | FreezerCreateManyHouseholdInput[]
    skipDuplicates?: boolean
  }

  export type FreezerItemCreateWithoutHouseholdInput = {
    id?: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    freezer: FreezerCreateNestedOneWithoutItemsInput
    compartment: CompartmentCreateNestedOneWithoutItemsInput
    createdBy: UserCreateNestedOneWithoutCreatedItemsInput
    updatedBy: UserCreateNestedOneWithoutUpdatedItemsInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutItemInput
  }

  export type FreezerItemUncheckedCreateWithoutHouseholdInput = {
    id?: string
    freezerId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type FreezerItemCreateOrConnectWithoutHouseholdInput = {
    where: FreezerItemWhereUniqueInput
    create: XOR<FreezerItemCreateWithoutHouseholdInput, FreezerItemUncheckedCreateWithoutHouseholdInput>
  }

  export type FreezerItemCreateManyHouseholdInputEnvelope = {
    data: FreezerItemCreateManyHouseholdInput | FreezerItemCreateManyHouseholdInput[]
    skipDuplicates?: boolean
  }

  export type HouseholdInviteCreateWithoutHouseholdInput = {
    id?: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    usedByUserId?: string | null
    createdAt?: Date | string
  }

  export type HouseholdInviteUncheckedCreateWithoutHouseholdInput = {
    id?: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    usedByUserId?: string | null
    createdAt?: Date | string
  }

  export type HouseholdInviteCreateOrConnectWithoutHouseholdInput = {
    where: HouseholdInviteWhereUniqueInput
    create: XOR<HouseholdInviteCreateWithoutHouseholdInput, HouseholdInviteUncheckedCreateWithoutHouseholdInput>
  }

  export type HouseholdInviteCreateManyHouseholdInputEnvelope = {
    data: HouseholdInviteCreateManyHouseholdInput | HouseholdInviteCreateManyHouseholdInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwnedHouseholdsInput = {
    update: XOR<UserUpdateWithoutOwnedHouseholdsInput, UserUncheckedUpdateWithoutOwnedHouseholdsInput>
    create: XOR<UserCreateWithoutOwnedHouseholdsInput, UserUncheckedCreateWithoutOwnedHouseholdsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedHouseholdsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedHouseholdsInput, UserUncheckedUpdateWithoutOwnedHouseholdsInput>
  }

  export type UserUpdateWithoutOwnedHouseholdsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    createdItems?: FreezerItemUpdateManyWithoutCreatedByNestedInput
    updatedItems?: FreezerItemUpdateManyWithoutUpdatedByNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedHouseholdsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    createdItems?: FreezerItemUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedItems?: FreezerItemUncheckedUpdateManyWithoutUpdatedByNestedInput
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type HouseholdMemberUpsertWithWhereUniqueWithoutHouseholdInput = {
    where: HouseholdMemberWhereUniqueInput
    update: XOR<HouseholdMemberUpdateWithoutHouseholdInput, HouseholdMemberUncheckedUpdateWithoutHouseholdInput>
    create: XOR<HouseholdMemberCreateWithoutHouseholdInput, HouseholdMemberUncheckedCreateWithoutHouseholdInput>
  }

  export type HouseholdMemberUpdateWithWhereUniqueWithoutHouseholdInput = {
    where: HouseholdMemberWhereUniqueInput
    data: XOR<HouseholdMemberUpdateWithoutHouseholdInput, HouseholdMemberUncheckedUpdateWithoutHouseholdInput>
  }

  export type HouseholdMemberUpdateManyWithWhereWithoutHouseholdInput = {
    where: HouseholdMemberScalarWhereInput
    data: XOR<HouseholdMemberUpdateManyMutationInput, HouseholdMemberUncheckedUpdateManyWithoutHouseholdInput>
  }

  export type FreezerUpsertWithWhereUniqueWithoutHouseholdInput = {
    where: FreezerWhereUniqueInput
    update: XOR<FreezerUpdateWithoutHouseholdInput, FreezerUncheckedUpdateWithoutHouseholdInput>
    create: XOR<FreezerCreateWithoutHouseholdInput, FreezerUncheckedCreateWithoutHouseholdInput>
  }

  export type FreezerUpdateWithWhereUniqueWithoutHouseholdInput = {
    where: FreezerWhereUniqueInput
    data: XOR<FreezerUpdateWithoutHouseholdInput, FreezerUncheckedUpdateWithoutHouseholdInput>
  }

  export type FreezerUpdateManyWithWhereWithoutHouseholdInput = {
    where: FreezerScalarWhereInput
    data: XOR<FreezerUpdateManyMutationInput, FreezerUncheckedUpdateManyWithoutHouseholdInput>
  }

  export type FreezerScalarWhereInput = {
    AND?: FreezerScalarWhereInput | FreezerScalarWhereInput[]
    OR?: FreezerScalarWhereInput[]
    NOT?: FreezerScalarWhereInput | FreezerScalarWhereInput[]
    id?: StringFilter<"Freezer"> | string
    householdId?: StringFilter<"Freezer"> | string
    name?: StringFilter<"Freezer"> | string
    description?: StringNullableFilter<"Freezer"> | string | null
    createdAt?: DateTimeFilter<"Freezer"> | Date | string
  }

  export type FreezerItemUpsertWithWhereUniqueWithoutHouseholdInput = {
    where: FreezerItemWhereUniqueInput
    update: XOR<FreezerItemUpdateWithoutHouseholdInput, FreezerItemUncheckedUpdateWithoutHouseholdInput>
    create: XOR<FreezerItemCreateWithoutHouseholdInput, FreezerItemUncheckedCreateWithoutHouseholdInput>
  }

  export type FreezerItemUpdateWithWhereUniqueWithoutHouseholdInput = {
    where: FreezerItemWhereUniqueInput
    data: XOR<FreezerItemUpdateWithoutHouseholdInput, FreezerItemUncheckedUpdateWithoutHouseholdInput>
  }

  export type FreezerItemUpdateManyWithWhereWithoutHouseholdInput = {
    where: FreezerItemScalarWhereInput
    data: XOR<FreezerItemUpdateManyMutationInput, FreezerItemUncheckedUpdateManyWithoutHouseholdInput>
  }

  export type HouseholdInviteUpsertWithWhereUniqueWithoutHouseholdInput = {
    where: HouseholdInviteWhereUniqueInput
    update: XOR<HouseholdInviteUpdateWithoutHouseholdInput, HouseholdInviteUncheckedUpdateWithoutHouseholdInput>
    create: XOR<HouseholdInviteCreateWithoutHouseholdInput, HouseholdInviteUncheckedCreateWithoutHouseholdInput>
  }

  export type HouseholdInviteUpdateWithWhereUniqueWithoutHouseholdInput = {
    where: HouseholdInviteWhereUniqueInput
    data: XOR<HouseholdInviteUpdateWithoutHouseholdInput, HouseholdInviteUncheckedUpdateWithoutHouseholdInput>
  }

  export type HouseholdInviteUpdateManyWithWhereWithoutHouseholdInput = {
    where: HouseholdInviteScalarWhereInput
    data: XOR<HouseholdInviteUpdateManyMutationInput, HouseholdInviteUncheckedUpdateManyWithoutHouseholdInput>
  }

  export type HouseholdInviteScalarWhereInput = {
    AND?: HouseholdInviteScalarWhereInput | HouseholdInviteScalarWhereInput[]
    OR?: HouseholdInviteScalarWhereInput[]
    NOT?: HouseholdInviteScalarWhereInput | HouseholdInviteScalarWhereInput[]
    id?: StringFilter<"HouseholdInvite"> | string
    householdId?: StringFilter<"HouseholdInvite"> | string
    code?: StringFilter<"HouseholdInvite"> | string
    expiresAt?: DateTimeFilter<"HouseholdInvite"> | Date | string
    usedAt?: DateTimeNullableFilter<"HouseholdInvite"> | Date | string | null
    usedByUserId?: StringNullableFilter<"HouseholdInvite"> | string | null
    createdAt?: DateTimeFilter<"HouseholdInvite"> | Date | string
  }

  export type HouseholdCreateWithoutMembersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedHouseholdsInput
    freezers?: FreezerCreateNestedManyWithoutHouseholdInput
    items?: FreezerItemCreateNestedManyWithoutHouseholdInput
    invites?: HouseholdInviteCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    ownerId: string
    freezers?: FreezerUncheckedCreateNestedManyWithoutHouseholdInput
    items?: FreezerItemUncheckedCreateNestedManyWithoutHouseholdInput
    invites?: HouseholdInviteUncheckedCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdCreateOrConnectWithoutMembersInput = {
    where: HouseholdWhereUniqueInput
    create: XOR<HouseholdCreateWithoutMembersInput, HouseholdUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutMembershipsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    ownedHouseholds?: HouseholdCreateNestedManyWithoutOwnerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    createdItems?: FreezerItemCreateNestedManyWithoutCreatedByInput
    updatedItems?: FreezerItemCreateNestedManyWithoutUpdatedByInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    ownedHouseholds?: HouseholdUncheckedCreateNestedManyWithoutOwnerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    createdItems?: FreezerItemUncheckedCreateNestedManyWithoutCreatedByInput
    updatedItems?: FreezerItemUncheckedCreateNestedManyWithoutUpdatedByInput
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type HouseholdUpsertWithoutMembersInput = {
    update: XOR<HouseholdUpdateWithoutMembersInput, HouseholdUncheckedUpdateWithoutMembersInput>
    create: XOR<HouseholdCreateWithoutMembersInput, HouseholdUncheckedCreateWithoutMembersInput>
    where?: HouseholdWhereInput
  }

  export type HouseholdUpdateToOneWithWhereWithoutMembersInput = {
    where?: HouseholdWhereInput
    data: XOR<HouseholdUpdateWithoutMembersInput, HouseholdUncheckedUpdateWithoutMembersInput>
  }

  export type HouseholdUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedHouseholdsNestedInput
    freezers?: FreezerUpdateManyWithoutHouseholdNestedInput
    items?: FreezerItemUpdateManyWithoutHouseholdNestedInput
    invites?: HouseholdInviteUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    freezers?: FreezerUncheckedUpdateManyWithoutHouseholdNestedInput
    items?: FreezerItemUncheckedUpdateManyWithoutHouseholdNestedInput
    invites?: HouseholdInviteUncheckedUpdateManyWithoutHouseholdNestedInput
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedHouseholds?: HouseholdUpdateManyWithoutOwnerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    createdItems?: FreezerItemUpdateManyWithoutCreatedByNestedInput
    updatedItems?: FreezerItemUpdateManyWithoutUpdatedByNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedHouseholds?: HouseholdUncheckedUpdateManyWithoutOwnerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    createdItems?: FreezerItemUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedItems?: FreezerItemUncheckedUpdateManyWithoutUpdatedByNestedInput
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type HouseholdCreateWithoutInvitesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedHouseholdsInput
    members?: HouseholdMemberCreateNestedManyWithoutHouseholdInput
    freezers?: FreezerCreateNestedManyWithoutHouseholdInput
    items?: FreezerItemCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUncheckedCreateWithoutInvitesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    ownerId: string
    members?: HouseholdMemberUncheckedCreateNestedManyWithoutHouseholdInput
    freezers?: FreezerUncheckedCreateNestedManyWithoutHouseholdInput
    items?: FreezerItemUncheckedCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdCreateOrConnectWithoutInvitesInput = {
    where: HouseholdWhereUniqueInput
    create: XOR<HouseholdCreateWithoutInvitesInput, HouseholdUncheckedCreateWithoutInvitesInput>
  }

  export type HouseholdUpsertWithoutInvitesInput = {
    update: XOR<HouseholdUpdateWithoutInvitesInput, HouseholdUncheckedUpdateWithoutInvitesInput>
    create: XOR<HouseholdCreateWithoutInvitesInput, HouseholdUncheckedCreateWithoutInvitesInput>
    where?: HouseholdWhereInput
  }

  export type HouseholdUpdateToOneWithWhereWithoutInvitesInput = {
    where?: HouseholdWhereInput
    data: XOR<HouseholdUpdateWithoutInvitesInput, HouseholdUncheckedUpdateWithoutInvitesInput>
  }

  export type HouseholdUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedHouseholdsNestedInput
    members?: HouseholdMemberUpdateManyWithoutHouseholdNestedInput
    freezers?: FreezerUpdateManyWithoutHouseholdNestedInput
    items?: FreezerItemUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    members?: HouseholdMemberUncheckedUpdateManyWithoutHouseholdNestedInput
    freezers?: FreezerUncheckedUpdateManyWithoutHouseholdNestedInput
    items?: FreezerItemUncheckedUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdCreateWithoutFreezersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedHouseholdsInput
    members?: HouseholdMemberCreateNestedManyWithoutHouseholdInput
    items?: FreezerItemCreateNestedManyWithoutHouseholdInput
    invites?: HouseholdInviteCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUncheckedCreateWithoutFreezersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    ownerId: string
    members?: HouseholdMemberUncheckedCreateNestedManyWithoutHouseholdInput
    items?: FreezerItemUncheckedCreateNestedManyWithoutHouseholdInput
    invites?: HouseholdInviteUncheckedCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdCreateOrConnectWithoutFreezersInput = {
    where: HouseholdWhereUniqueInput
    create: XOR<HouseholdCreateWithoutFreezersInput, HouseholdUncheckedCreateWithoutFreezersInput>
  }

  export type CompartmentCreateWithoutFreezerInput = {
    id?: string
    name: string
    position?: number
    items?: FreezerItemCreateNestedManyWithoutCompartmentInput
  }

  export type CompartmentUncheckedCreateWithoutFreezerInput = {
    id?: string
    name: string
    position?: number
    items?: FreezerItemUncheckedCreateNestedManyWithoutCompartmentInput
  }

  export type CompartmentCreateOrConnectWithoutFreezerInput = {
    where: CompartmentWhereUniqueInput
    create: XOR<CompartmentCreateWithoutFreezerInput, CompartmentUncheckedCreateWithoutFreezerInput>
  }

  export type CompartmentCreateManyFreezerInputEnvelope = {
    data: CompartmentCreateManyFreezerInput | CompartmentCreateManyFreezerInput[]
    skipDuplicates?: boolean
  }

  export type FreezerItemCreateWithoutFreezerInput = {
    id?: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutItemsInput
    compartment: CompartmentCreateNestedOneWithoutItemsInput
    createdBy: UserCreateNestedOneWithoutCreatedItemsInput
    updatedBy: UserCreateNestedOneWithoutUpdatedItemsInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutItemInput
  }

  export type FreezerItemUncheckedCreateWithoutFreezerInput = {
    id?: string
    householdId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type FreezerItemCreateOrConnectWithoutFreezerInput = {
    where: FreezerItemWhereUniqueInput
    create: XOR<FreezerItemCreateWithoutFreezerInput, FreezerItemUncheckedCreateWithoutFreezerInput>
  }

  export type FreezerItemCreateManyFreezerInputEnvelope = {
    data: FreezerItemCreateManyFreezerInput | FreezerItemCreateManyFreezerInput[]
    skipDuplicates?: boolean
  }

  export type HouseholdUpsertWithoutFreezersInput = {
    update: XOR<HouseholdUpdateWithoutFreezersInput, HouseholdUncheckedUpdateWithoutFreezersInput>
    create: XOR<HouseholdCreateWithoutFreezersInput, HouseholdUncheckedCreateWithoutFreezersInput>
    where?: HouseholdWhereInput
  }

  export type HouseholdUpdateToOneWithWhereWithoutFreezersInput = {
    where?: HouseholdWhereInput
    data: XOR<HouseholdUpdateWithoutFreezersInput, HouseholdUncheckedUpdateWithoutFreezersInput>
  }

  export type HouseholdUpdateWithoutFreezersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedHouseholdsNestedInput
    members?: HouseholdMemberUpdateManyWithoutHouseholdNestedInput
    items?: FreezerItemUpdateManyWithoutHouseholdNestedInput
    invites?: HouseholdInviteUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateWithoutFreezersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    members?: HouseholdMemberUncheckedUpdateManyWithoutHouseholdNestedInput
    items?: FreezerItemUncheckedUpdateManyWithoutHouseholdNestedInput
    invites?: HouseholdInviteUncheckedUpdateManyWithoutHouseholdNestedInput
  }

  export type CompartmentUpsertWithWhereUniqueWithoutFreezerInput = {
    where: CompartmentWhereUniqueInput
    update: XOR<CompartmentUpdateWithoutFreezerInput, CompartmentUncheckedUpdateWithoutFreezerInput>
    create: XOR<CompartmentCreateWithoutFreezerInput, CompartmentUncheckedCreateWithoutFreezerInput>
  }

  export type CompartmentUpdateWithWhereUniqueWithoutFreezerInput = {
    where: CompartmentWhereUniqueInput
    data: XOR<CompartmentUpdateWithoutFreezerInput, CompartmentUncheckedUpdateWithoutFreezerInput>
  }

  export type CompartmentUpdateManyWithWhereWithoutFreezerInput = {
    where: CompartmentScalarWhereInput
    data: XOR<CompartmentUpdateManyMutationInput, CompartmentUncheckedUpdateManyWithoutFreezerInput>
  }

  export type CompartmentScalarWhereInput = {
    AND?: CompartmentScalarWhereInput | CompartmentScalarWhereInput[]
    OR?: CompartmentScalarWhereInput[]
    NOT?: CompartmentScalarWhereInput | CompartmentScalarWhereInput[]
    id?: StringFilter<"Compartment"> | string
    freezerId?: StringFilter<"Compartment"> | string
    name?: StringFilter<"Compartment"> | string
    position?: IntFilter<"Compartment"> | number
  }

  export type FreezerItemUpsertWithWhereUniqueWithoutFreezerInput = {
    where: FreezerItemWhereUniqueInput
    update: XOR<FreezerItemUpdateWithoutFreezerInput, FreezerItemUncheckedUpdateWithoutFreezerInput>
    create: XOR<FreezerItemCreateWithoutFreezerInput, FreezerItemUncheckedCreateWithoutFreezerInput>
  }

  export type FreezerItemUpdateWithWhereUniqueWithoutFreezerInput = {
    where: FreezerItemWhereUniqueInput
    data: XOR<FreezerItemUpdateWithoutFreezerInput, FreezerItemUncheckedUpdateWithoutFreezerInput>
  }

  export type FreezerItemUpdateManyWithWhereWithoutFreezerInput = {
    where: FreezerItemScalarWhereInput
    data: XOR<FreezerItemUpdateManyMutationInput, FreezerItemUncheckedUpdateManyWithoutFreezerInput>
  }

  export type FreezerCreateWithoutCompartmentsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    household: HouseholdCreateNestedOneWithoutFreezersInput
    items?: FreezerItemCreateNestedManyWithoutFreezerInput
  }

  export type FreezerUncheckedCreateWithoutCompartmentsInput = {
    id?: string
    householdId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    items?: FreezerItemUncheckedCreateNestedManyWithoutFreezerInput
  }

  export type FreezerCreateOrConnectWithoutCompartmentsInput = {
    where: FreezerWhereUniqueInput
    create: XOR<FreezerCreateWithoutCompartmentsInput, FreezerUncheckedCreateWithoutCompartmentsInput>
  }

  export type FreezerItemCreateWithoutCompartmentInput = {
    id?: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutItemsInput
    freezer: FreezerCreateNestedOneWithoutItemsInput
    createdBy: UserCreateNestedOneWithoutCreatedItemsInput
    updatedBy: UserCreateNestedOneWithoutUpdatedItemsInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutItemInput
  }

  export type FreezerItemUncheckedCreateWithoutCompartmentInput = {
    id?: string
    householdId: string
    freezerId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type FreezerItemCreateOrConnectWithoutCompartmentInput = {
    where: FreezerItemWhereUniqueInput
    create: XOR<FreezerItemCreateWithoutCompartmentInput, FreezerItemUncheckedCreateWithoutCompartmentInput>
  }

  export type FreezerItemCreateManyCompartmentInputEnvelope = {
    data: FreezerItemCreateManyCompartmentInput | FreezerItemCreateManyCompartmentInput[]
    skipDuplicates?: boolean
  }

  export type FreezerUpsertWithoutCompartmentsInput = {
    update: XOR<FreezerUpdateWithoutCompartmentsInput, FreezerUncheckedUpdateWithoutCompartmentsInput>
    create: XOR<FreezerCreateWithoutCompartmentsInput, FreezerUncheckedCreateWithoutCompartmentsInput>
    where?: FreezerWhereInput
  }

  export type FreezerUpdateToOneWithWhereWithoutCompartmentsInput = {
    where?: FreezerWhereInput
    data: XOR<FreezerUpdateWithoutCompartmentsInput, FreezerUncheckedUpdateWithoutCompartmentsInput>
  }

  export type FreezerUpdateWithoutCompartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutFreezersNestedInput
    items?: FreezerItemUpdateManyWithoutFreezerNestedInput
  }

  export type FreezerUncheckedUpdateWithoutCompartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: FreezerItemUncheckedUpdateManyWithoutFreezerNestedInput
  }

  export type FreezerItemUpsertWithWhereUniqueWithoutCompartmentInput = {
    where: FreezerItemWhereUniqueInput
    update: XOR<FreezerItemUpdateWithoutCompartmentInput, FreezerItemUncheckedUpdateWithoutCompartmentInput>
    create: XOR<FreezerItemCreateWithoutCompartmentInput, FreezerItemUncheckedCreateWithoutCompartmentInput>
  }

  export type FreezerItemUpdateWithWhereUniqueWithoutCompartmentInput = {
    where: FreezerItemWhereUniqueInput
    data: XOR<FreezerItemUpdateWithoutCompartmentInput, FreezerItemUncheckedUpdateWithoutCompartmentInput>
  }

  export type FreezerItemUpdateManyWithWhereWithoutCompartmentInput = {
    where: FreezerItemScalarWhereInput
    data: XOR<FreezerItemUpdateManyMutationInput, FreezerItemUncheckedUpdateManyWithoutCompartmentInput>
  }

  export type HouseholdCreateWithoutItemsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedHouseholdsInput
    members?: HouseholdMemberCreateNestedManyWithoutHouseholdInput
    freezers?: FreezerCreateNestedManyWithoutHouseholdInput
    invites?: HouseholdInviteCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdUncheckedCreateWithoutItemsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    ownerId: string
    members?: HouseholdMemberUncheckedCreateNestedManyWithoutHouseholdInput
    freezers?: FreezerUncheckedCreateNestedManyWithoutHouseholdInput
    invites?: HouseholdInviteUncheckedCreateNestedManyWithoutHouseholdInput
  }

  export type HouseholdCreateOrConnectWithoutItemsInput = {
    where: HouseholdWhereUniqueInput
    create: XOR<HouseholdCreateWithoutItemsInput, HouseholdUncheckedCreateWithoutItemsInput>
  }

  export type FreezerCreateWithoutItemsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    household: HouseholdCreateNestedOneWithoutFreezersInput
    compartments?: CompartmentCreateNestedManyWithoutFreezerInput
  }

  export type FreezerUncheckedCreateWithoutItemsInput = {
    id?: string
    householdId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    compartments?: CompartmentUncheckedCreateNestedManyWithoutFreezerInput
  }

  export type FreezerCreateOrConnectWithoutItemsInput = {
    where: FreezerWhereUniqueInput
    create: XOR<FreezerCreateWithoutItemsInput, FreezerUncheckedCreateWithoutItemsInput>
  }

  export type CompartmentCreateWithoutItemsInput = {
    id?: string
    name: string
    position?: number
    freezer: FreezerCreateNestedOneWithoutCompartmentsInput
  }

  export type CompartmentUncheckedCreateWithoutItemsInput = {
    id?: string
    freezerId: string
    name: string
    position?: number
  }

  export type CompartmentCreateOrConnectWithoutItemsInput = {
    where: CompartmentWhereUniqueInput
    create: XOR<CompartmentCreateWithoutItemsInput, CompartmentUncheckedCreateWithoutItemsInput>
  }

  export type UserCreateWithoutCreatedItemsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberCreateNestedManyWithoutUserInput
    ownedHouseholds?: HouseholdCreateNestedManyWithoutOwnerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    updatedItems?: FreezerItemCreateNestedManyWithoutUpdatedByInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutCreatedItemsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberUncheckedCreateNestedManyWithoutUserInput
    ownedHouseholds?: HouseholdUncheckedCreateNestedManyWithoutOwnerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    updatedItems?: FreezerItemUncheckedCreateNestedManyWithoutUpdatedByInput
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutCreatedItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedItemsInput, UserUncheckedCreateWithoutCreatedItemsInput>
  }

  export type UserCreateWithoutUpdatedItemsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberCreateNestedManyWithoutUserInput
    ownedHouseholds?: HouseholdCreateNestedManyWithoutOwnerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    createdItems?: FreezerItemCreateNestedManyWithoutCreatedByInput
    changeLogs?: ItemChangeLogCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutUpdatedItemsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberUncheckedCreateNestedManyWithoutUserInput
    ownedHouseholds?: HouseholdUncheckedCreateNestedManyWithoutOwnerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    createdItems?: FreezerItemUncheckedCreateNestedManyWithoutCreatedByInput
    changeLogs?: ItemChangeLogUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutUpdatedItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUpdatedItemsInput, UserUncheckedCreateWithoutUpdatedItemsInput>
  }

  export type ItemChangeLogCreateWithoutItemInput = {
    id?: string
    changedAt?: Date | string
    fieldName: string
    oldValue?: string | null
    newValue?: string | null
    changedBy: UserCreateNestedOneWithoutChangeLogsInput
  }

  export type ItemChangeLogUncheckedCreateWithoutItemInput = {
    id?: string
    changedById: string
    changedAt?: Date | string
    fieldName: string
    oldValue?: string | null
    newValue?: string | null
  }

  export type ItemChangeLogCreateOrConnectWithoutItemInput = {
    where: ItemChangeLogWhereUniqueInput
    create: XOR<ItemChangeLogCreateWithoutItemInput, ItemChangeLogUncheckedCreateWithoutItemInput>
  }

  export type ItemChangeLogCreateManyItemInputEnvelope = {
    data: ItemChangeLogCreateManyItemInput | ItemChangeLogCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type HouseholdUpsertWithoutItemsInput = {
    update: XOR<HouseholdUpdateWithoutItemsInput, HouseholdUncheckedUpdateWithoutItemsInput>
    create: XOR<HouseholdCreateWithoutItemsInput, HouseholdUncheckedCreateWithoutItemsInput>
    where?: HouseholdWhereInput
  }

  export type HouseholdUpdateToOneWithWhereWithoutItemsInput = {
    where?: HouseholdWhereInput
    data: XOR<HouseholdUpdateWithoutItemsInput, HouseholdUncheckedUpdateWithoutItemsInput>
  }

  export type HouseholdUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedHouseholdsNestedInput
    members?: HouseholdMemberUpdateManyWithoutHouseholdNestedInput
    freezers?: FreezerUpdateManyWithoutHouseholdNestedInput
    invites?: HouseholdInviteUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    members?: HouseholdMemberUncheckedUpdateManyWithoutHouseholdNestedInput
    freezers?: FreezerUncheckedUpdateManyWithoutHouseholdNestedInput
    invites?: HouseholdInviteUncheckedUpdateManyWithoutHouseholdNestedInput
  }

  export type FreezerUpsertWithoutItemsInput = {
    update: XOR<FreezerUpdateWithoutItemsInput, FreezerUncheckedUpdateWithoutItemsInput>
    create: XOR<FreezerCreateWithoutItemsInput, FreezerUncheckedCreateWithoutItemsInput>
    where?: FreezerWhereInput
  }

  export type FreezerUpdateToOneWithWhereWithoutItemsInput = {
    where?: FreezerWhereInput
    data: XOR<FreezerUpdateWithoutItemsInput, FreezerUncheckedUpdateWithoutItemsInput>
  }

  export type FreezerUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutFreezersNestedInput
    compartments?: CompartmentUpdateManyWithoutFreezerNestedInput
  }

  export type FreezerUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    compartments?: CompartmentUncheckedUpdateManyWithoutFreezerNestedInput
  }

  export type CompartmentUpsertWithoutItemsInput = {
    update: XOR<CompartmentUpdateWithoutItemsInput, CompartmentUncheckedUpdateWithoutItemsInput>
    create: XOR<CompartmentCreateWithoutItemsInput, CompartmentUncheckedCreateWithoutItemsInput>
    where?: CompartmentWhereInput
  }

  export type CompartmentUpdateToOneWithWhereWithoutItemsInput = {
    where?: CompartmentWhereInput
    data: XOR<CompartmentUpdateWithoutItemsInput, CompartmentUncheckedUpdateWithoutItemsInput>
  }

  export type CompartmentUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    freezer?: FreezerUpdateOneRequiredWithoutCompartmentsNestedInput
  }

  export type CompartmentUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpsertWithoutCreatedItemsInput = {
    update: XOR<UserUpdateWithoutCreatedItemsInput, UserUncheckedUpdateWithoutCreatedItemsInput>
    create: XOR<UserCreateWithoutCreatedItemsInput, UserUncheckedCreateWithoutCreatedItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedItemsInput, UserUncheckedUpdateWithoutCreatedItemsInput>
  }

  export type UserUpdateWithoutCreatedItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUpdateManyWithoutUserNestedInput
    ownedHouseholds?: HouseholdUpdateManyWithoutOwnerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    updatedItems?: FreezerItemUpdateManyWithoutUpdatedByNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedHouseholds?: HouseholdUncheckedUpdateManyWithoutOwnerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    updatedItems?: FreezerItemUncheckedUpdateManyWithoutUpdatedByNestedInput
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type UserUpsertWithoutUpdatedItemsInput = {
    update: XOR<UserUpdateWithoutUpdatedItemsInput, UserUncheckedUpdateWithoutUpdatedItemsInput>
    create: XOR<UserCreateWithoutUpdatedItemsInput, UserUncheckedCreateWithoutUpdatedItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUpdatedItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUpdatedItemsInput, UserUncheckedUpdateWithoutUpdatedItemsInput>
  }

  export type UserUpdateWithoutUpdatedItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUpdateManyWithoutUserNestedInput
    ownedHouseholds?: HouseholdUpdateManyWithoutOwnerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    createdItems?: FreezerItemUpdateManyWithoutCreatedByNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUpdatedItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedHouseholds?: HouseholdUncheckedUpdateManyWithoutOwnerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    createdItems?: FreezerItemUncheckedUpdateManyWithoutCreatedByNestedInput
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type ItemChangeLogUpsertWithWhereUniqueWithoutItemInput = {
    where: ItemChangeLogWhereUniqueInput
    update: XOR<ItemChangeLogUpdateWithoutItemInput, ItemChangeLogUncheckedUpdateWithoutItemInput>
    create: XOR<ItemChangeLogCreateWithoutItemInput, ItemChangeLogUncheckedCreateWithoutItemInput>
  }

  export type ItemChangeLogUpdateWithWhereUniqueWithoutItemInput = {
    where: ItemChangeLogWhereUniqueInput
    data: XOR<ItemChangeLogUpdateWithoutItemInput, ItemChangeLogUncheckedUpdateWithoutItemInput>
  }

  export type ItemChangeLogUpdateManyWithWhereWithoutItemInput = {
    where: ItemChangeLogScalarWhereInput
    data: XOR<ItemChangeLogUpdateManyMutationInput, ItemChangeLogUncheckedUpdateManyWithoutItemInput>
  }

  export type FreezerItemCreateWithoutChangeLogsInput = {
    id?: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    household: HouseholdCreateNestedOneWithoutItemsInput
    freezer: FreezerCreateNestedOneWithoutItemsInput
    compartment: CompartmentCreateNestedOneWithoutItemsInput
    createdBy: UserCreateNestedOneWithoutCreatedItemsInput
    updatedBy: UserCreateNestedOneWithoutUpdatedItemsInput
  }

  export type FreezerItemUncheckedCreateWithoutChangeLogsInput = {
    id?: string
    householdId: string
    freezerId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FreezerItemCreateOrConnectWithoutChangeLogsInput = {
    where: FreezerItemWhereUniqueInput
    create: XOR<FreezerItemCreateWithoutChangeLogsInput, FreezerItemUncheckedCreateWithoutChangeLogsInput>
  }

  export type UserCreateWithoutChangeLogsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberCreateNestedManyWithoutUserInput
    ownedHouseholds?: HouseholdCreateNestedManyWithoutOwnerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    createdItems?: FreezerItemCreateNestedManyWithoutCreatedByInput
    updatedItems?: FreezerItemCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutChangeLogsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    memberships?: HouseholdMemberUncheckedCreateNestedManyWithoutUserInput
    ownedHouseholds?: HouseholdUncheckedCreateNestedManyWithoutOwnerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    createdItems?: FreezerItemUncheckedCreateNestedManyWithoutCreatedByInput
    updatedItems?: FreezerItemUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutChangeLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChangeLogsInput, UserUncheckedCreateWithoutChangeLogsInput>
  }

  export type FreezerItemUpsertWithoutChangeLogsInput = {
    update: XOR<FreezerItemUpdateWithoutChangeLogsInput, FreezerItemUncheckedUpdateWithoutChangeLogsInput>
    create: XOR<FreezerItemCreateWithoutChangeLogsInput, FreezerItemUncheckedCreateWithoutChangeLogsInput>
    where?: FreezerItemWhereInput
  }

  export type FreezerItemUpdateToOneWithWhereWithoutChangeLogsInput = {
    where?: FreezerItemWhereInput
    data: XOR<FreezerItemUpdateWithoutChangeLogsInput, FreezerItemUncheckedUpdateWithoutChangeLogsInput>
  }

  export type FreezerItemUpdateWithoutChangeLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutItemsNestedInput
    freezer?: FreezerUpdateOneRequiredWithoutItemsNestedInput
    compartment?: CompartmentUpdateOneRequiredWithoutItemsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedItemsNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutUpdatedItemsNestedInput
  }

  export type FreezerItemUncheckedUpdateWithoutChangeLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutChangeLogsInput = {
    update: XOR<UserUpdateWithoutChangeLogsInput, UserUncheckedUpdateWithoutChangeLogsInput>
    create: XOR<UserCreateWithoutChangeLogsInput, UserUncheckedCreateWithoutChangeLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChangeLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChangeLogsInput, UserUncheckedUpdateWithoutChangeLogsInput>
  }

  export type UserUpdateWithoutChangeLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUpdateManyWithoutUserNestedInput
    ownedHouseholds?: HouseholdUpdateManyWithoutOwnerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    createdItems?: FreezerItemUpdateManyWithoutCreatedByNestedInput
    updatedItems?: FreezerItemUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutChangeLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: HouseholdMemberUncheckedUpdateManyWithoutUserNestedInput
    ownedHouseholds?: HouseholdUncheckedUpdateManyWithoutOwnerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    createdItems?: FreezerItemUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedItems?: FreezerItemUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type HouseholdMemberCreateManyUserInput = {
    id?: string
    householdId: string
    role?: $Enums.HouseholdRole
    joinedAt?: Date | string
  }

  export type HouseholdCreateManyOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FreezerItemCreateManyCreatedByInput = {
    id?: string
    householdId: string
    freezerId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FreezerItemCreateManyUpdatedByInput = {
    id?: string
    householdId: string
    freezerId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemChangeLogCreateManyChangedByInput = {
    id?: string
    itemId: string
    changedAt?: Date | string
    fieldName: string
    oldValue?: string | null
    newValue?: string | null
  }

  export type HouseholdMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutMembersNestedInput
  }

  export type HouseholdMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: HouseholdMemberUpdateManyWithoutHouseholdNestedInput
    freezers?: FreezerUpdateManyWithoutHouseholdNestedInput
    items?: FreezerItemUpdateManyWithoutHouseholdNestedInput
    invites?: HouseholdInviteUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: HouseholdMemberUncheckedUpdateManyWithoutHouseholdNestedInput
    freezers?: FreezerUncheckedUpdateManyWithoutHouseholdNestedInput
    items?: FreezerItemUncheckedUpdateManyWithoutHouseholdNestedInput
    invites?: HouseholdInviteUncheckedUpdateManyWithoutHouseholdNestedInput
  }

  export type HouseholdUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FreezerItemUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutItemsNestedInput
    freezer?: FreezerUpdateOneRequiredWithoutItemsNestedInput
    compartment?: CompartmentUpdateOneRequiredWithoutItemsNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutUpdatedItemsNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FreezerItemUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutItemsNestedInput
    freezer?: FreezerUpdateOneRequiredWithoutItemsNestedInput
    compartment?: CompartmentUpdateOneRequiredWithoutItemsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedItemsNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemChangeLogUpdateWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fieldName?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    item?: FreezerItemUpdateOneRequiredWithoutChangeLogsNestedInput
  }

  export type ItemChangeLogUncheckedUpdateWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fieldName?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemChangeLogUncheckedUpdateManyWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fieldName?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HouseholdMemberCreateManyHouseholdInput = {
    id?: string
    userId: string
    role?: $Enums.HouseholdRole
    joinedAt?: Date | string
  }

  export type FreezerCreateManyHouseholdInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
  }

  export type FreezerItemCreateManyHouseholdInput = {
    id?: string
    freezerId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HouseholdInviteCreateManyHouseholdInput = {
    id?: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    usedByUserId?: string | null
    createdAt?: Date | string
  }

  export type HouseholdMemberUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type HouseholdMemberUncheckedUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdMemberUncheckedUpdateManyWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumHouseholdRoleFieldUpdateOperationsInput | $Enums.HouseholdRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FreezerUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    compartments?: CompartmentUpdateManyWithoutFreezerNestedInput
    items?: FreezerItemUpdateManyWithoutFreezerNestedInput
  }

  export type FreezerUncheckedUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    compartments?: CompartmentUncheckedUpdateManyWithoutFreezerNestedInput
    items?: FreezerItemUncheckedUpdateManyWithoutFreezerNestedInput
  }

  export type FreezerUncheckedUpdateManyWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FreezerItemUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    freezer?: FreezerUpdateOneRequiredWithoutItemsNestedInput
    compartment?: CompartmentUpdateOneRequiredWithoutItemsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedItemsNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutUpdatedItemsNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateManyWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdInviteUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdInviteUncheckedUpdateWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HouseholdInviteUncheckedUpdateManyWithoutHouseholdInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompartmentCreateManyFreezerInput = {
    id?: string
    name: string
    position?: number
  }

  export type FreezerItemCreateManyFreezerInput = {
    id?: string
    householdId: string
    compartmentId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompartmentUpdateWithoutFreezerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    items?: FreezerItemUpdateManyWithoutCompartmentNestedInput
  }

  export type CompartmentUncheckedUpdateWithoutFreezerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    items?: FreezerItemUncheckedUpdateManyWithoutCompartmentNestedInput
  }

  export type CompartmentUncheckedUpdateManyWithoutFreezerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type FreezerItemUpdateWithoutFreezerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutItemsNestedInput
    compartment?: CompartmentUpdateOneRequiredWithoutItemsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedItemsNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutUpdatedItemsNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateWithoutFreezerInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateManyWithoutFreezerInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    compartmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FreezerItemCreateManyCompartmentInput = {
    id?: string
    householdId: string
    freezerId: string
    name: string
    quantity: string
    notes?: string | null
    storedAt?: Date | string
    expiresAt?: Date | string | null
    deletedAt?: Date | string | null
    createdById: string
    updatedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FreezerItemUpdateWithoutCompartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    household?: HouseholdUpdateOneRequiredWithoutItemsNestedInput
    freezer?: FreezerUpdateOneRequiredWithoutItemsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedItemsNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutUpdatedItemsNestedInput
    changeLogs?: ItemChangeLogUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateWithoutCompartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changeLogs?: ItemChangeLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type FreezerItemUncheckedUpdateManyWithoutCompartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    householdId?: StringFieldUpdateOperationsInput | string
    freezerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    storedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    updatedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemChangeLogCreateManyItemInput = {
    id?: string
    changedById: string
    changedAt?: Date | string
    fieldName: string
    oldValue?: string | null
    newValue?: string | null
  }

  export type ItemChangeLogUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fieldName?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: UserUpdateOneRequiredWithoutChangeLogsNestedInput
  }

  export type ItemChangeLogUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fieldName?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemChangeLogUncheckedUpdateManyWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fieldName?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}