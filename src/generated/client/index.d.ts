
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Carrera
 * 
 */
export type Carrera = $Result.DefaultSelection<Prisma.$CarreraPayload>
/**
 * Model PreferenciaUsuarioCarrera
 * 
 */
export type PreferenciaUsuarioCarrera = $Result.DefaultSelection<Prisma.$PreferenciaUsuarioCarreraPayload>
/**
 * Model DeviceToken
 * 
 */
export type DeviceToken = $Result.DefaultSelection<Prisma.$DeviceTokenPayload>
/**
 * Model UserCode
 * 
 */
export type UserCode = $Result.DefaultSelection<Prisma.$UserCodePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.carrera`: Exposes CRUD operations for the **Carrera** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carreras
    * const carreras = await prisma.carrera.findMany()
    * ```
    */
  get carrera(): Prisma.CarreraDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preferenciaUsuarioCarrera`: Exposes CRUD operations for the **PreferenciaUsuarioCarrera** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreferenciaUsuarioCarreras
    * const preferenciaUsuarioCarreras = await prisma.preferenciaUsuarioCarrera.findMany()
    * ```
    */
  get preferenciaUsuarioCarrera(): Prisma.PreferenciaUsuarioCarreraDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deviceToken`: Exposes CRUD operations for the **DeviceToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeviceTokens
    * const deviceTokens = await prisma.deviceToken.findMany()
    * ```
    */
  get deviceToken(): Prisma.DeviceTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userCode`: Exposes CRUD operations for the **UserCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCodes
    * const userCodes = await prisma.userCode.findMany()
    * ```
    */
  get userCode(): Prisma.UserCodeDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
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
    Usuario: 'Usuario',
    Carrera: 'Carrera',
    PreferenciaUsuarioCarrera: 'PreferenciaUsuarioCarrera',
    DeviceToken: 'DeviceToken',
    UserCode: 'UserCode'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "carrera" | "preferenciaUsuarioCarrera" | "deviceToken" | "userCode"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Carrera: {
        payload: Prisma.$CarreraPayload<ExtArgs>
        fields: Prisma.CarreraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CarreraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CarreraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload>
          }
          findFirst: {
            args: Prisma.CarreraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CarreraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload>
          }
          findMany: {
            args: Prisma.CarreraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload>[]
          }
          create: {
            args: Prisma.CarreraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload>
          }
          createMany: {
            args: Prisma.CarreraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CarreraCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload>[]
          }
          delete: {
            args: Prisma.CarreraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload>
          }
          update: {
            args: Prisma.CarreraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload>
          }
          deleteMany: {
            args: Prisma.CarreraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CarreraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CarreraUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload>[]
          }
          upsert: {
            args: Prisma.CarreraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarreraPayload>
          }
          aggregate: {
            args: Prisma.CarreraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCarrera>
          }
          groupBy: {
            args: Prisma.CarreraGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarreraGroupByOutputType>[]
          }
          count: {
            args: Prisma.CarreraCountArgs<ExtArgs>
            result: $Utils.Optional<CarreraCountAggregateOutputType> | number
          }
        }
      }
      PreferenciaUsuarioCarrera: {
        payload: Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>
        fields: Prisma.PreferenciaUsuarioCarreraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreferenciaUsuarioCarreraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreferenciaUsuarioCarreraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload>
          }
          findFirst: {
            args: Prisma.PreferenciaUsuarioCarreraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreferenciaUsuarioCarreraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload>
          }
          findMany: {
            args: Prisma.PreferenciaUsuarioCarreraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload>[]
          }
          create: {
            args: Prisma.PreferenciaUsuarioCarreraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload>
          }
          createMany: {
            args: Prisma.PreferenciaUsuarioCarreraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreferenciaUsuarioCarreraCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload>[]
          }
          delete: {
            args: Prisma.PreferenciaUsuarioCarreraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload>
          }
          update: {
            args: Prisma.PreferenciaUsuarioCarreraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload>
          }
          deleteMany: {
            args: Prisma.PreferenciaUsuarioCarreraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreferenciaUsuarioCarreraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PreferenciaUsuarioCarreraUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload>[]
          }
          upsert: {
            args: Prisma.PreferenciaUsuarioCarreraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferenciaUsuarioCarreraPayload>
          }
          aggregate: {
            args: Prisma.PreferenciaUsuarioCarreraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreferenciaUsuarioCarrera>
          }
          groupBy: {
            args: Prisma.PreferenciaUsuarioCarreraGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreferenciaUsuarioCarreraGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreferenciaUsuarioCarreraCountArgs<ExtArgs>
            result: $Utils.Optional<PreferenciaUsuarioCarreraCountAggregateOutputType> | number
          }
        }
      }
      DeviceToken: {
        payload: Prisma.$DeviceTokenPayload<ExtArgs>
        fields: Prisma.DeviceTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload>
          }
          findFirst: {
            args: Prisma.DeviceTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload>
          }
          findMany: {
            args: Prisma.DeviceTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload>[]
          }
          create: {
            args: Prisma.DeviceTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload>
          }
          createMany: {
            args: Prisma.DeviceTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload>[]
          }
          delete: {
            args: Prisma.DeviceTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload>
          }
          update: {
            args: Prisma.DeviceTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload>
          }
          deleteMany: {
            args: Prisma.DeviceTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeviceTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload>[]
          }
          upsert: {
            args: Prisma.DeviceTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceTokenPayload>
          }
          aggregate: {
            args: Prisma.DeviceTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeviceToken>
          }
          groupBy: {
            args: Prisma.DeviceTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceTokenCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceTokenCountAggregateOutputType> | number
          }
        }
      }
      UserCode: {
        payload: Prisma.$UserCodePayload<ExtArgs>
        fields: Prisma.UserCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload>
          }
          findFirst: {
            args: Prisma.UserCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload>
          }
          findMany: {
            args: Prisma.UserCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload>[]
          }
          create: {
            args: Prisma.UserCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload>
          }
          createMany: {
            args: Prisma.UserCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload>[]
          }
          delete: {
            args: Prisma.UserCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload>
          }
          update: {
            args: Prisma.UserCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload>
          }
          deleteMany: {
            args: Prisma.UserCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload>[]
          }
          upsert: {
            args: Prisma.UserCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCodePayload>
          }
          aggregate: {
            args: Prisma.UserCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserCode>
          }
          groupBy: {
            args: Prisma.UserCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCodeCountArgs<ExtArgs>
            result: $Utils.Optional<UserCodeCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
    adapter?: runtime.SqlDriverAdapterFactory | null
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
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    carrera?: CarreraOmit
    preferenciaUsuarioCarrera?: PreferenciaUsuarioCarreraOmit
    deviceToken?: DeviceTokenOmit
    userCode?: UserCodeOmit
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
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    deviceTokens: number
    preferencias: number
    userCodes: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deviceTokens?: boolean | UsuarioCountOutputTypeCountDeviceTokensArgs
    preferencias?: boolean | UsuarioCountOutputTypeCountPreferenciasArgs
    userCodes?: boolean | UsuarioCountOutputTypeCountUserCodesArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountDeviceTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceTokenWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountPreferenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreferenciaUsuarioCarreraWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountUserCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCodeWhereInput
  }


  /**
   * Count Type CarreraCountOutputType
   */

  export type CarreraCountOutputType = {
    usuariosConPreferencia: number
  }

  export type CarreraCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuariosConPreferencia?: boolean | CarreraCountOutputTypeCountUsuariosConPreferenciaArgs
  }

  // Custom InputTypes
  /**
   * CarreraCountOutputType without action
   */
  export type CarreraCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarreraCountOutputType
     */
    select?: CarreraCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CarreraCountOutputType without action
   */
  export type CarreraCountOutputTypeCountUsuariosConPreferenciaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreferenciaUsuarioCarreraWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    apellido: string | null
    email: string | null
    password: string | null
    rol: string | null
    verificado: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    apellido: string | null
    email: string | null
    password: string | null
    rol: string | null
    verificado: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nombre: number
    apellido: number
    email: number
    password: number
    rol: number
    verificado: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    nombre?: true
    apellido?: true
    email?: true
    password?: true
    rol?: true
    verificado?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nombre?: true
    apellido?: true
    email?: true
    password?: true
    rol?: true
    verificado?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nombre?: true
    apellido?: true
    email?: true
    password?: true
    rol?: true
    verificado?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    nombre: string
    apellido: string
    email: string
    password: string
    rol: string | null
    verificado: boolean
    createdAt: Date
    updatedAt: Date
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    verificado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deviceTokens?: boolean | Usuario$deviceTokensArgs<ExtArgs>
    preferencias?: boolean | Usuario$preferenciasArgs<ExtArgs>
    userCodes?: boolean | Usuario$userCodesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    verificado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    verificado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    verificado?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "apellido" | "email" | "password" | "rol" | "verificado" | "createdAt" | "updatedAt", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deviceTokens?: boolean | Usuario$deviceTokensArgs<ExtArgs>
    preferencias?: boolean | Usuario$preferenciasArgs<ExtArgs>
    userCodes?: boolean | Usuario$userCodesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      deviceTokens: Prisma.$DeviceTokenPayload<ExtArgs>[]
      preferencias: Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>[]
      userCodes: Prisma.$UserCodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      apellido: string
      email: string
      password: string
      rol: string | null
      verificado: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
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
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
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
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deviceTokens<T extends Usuario$deviceTokensArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$deviceTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    preferencias<T extends Usuario$preferenciasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$preferenciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userCodes<T extends Usuario$userCodesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$userCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly apellido: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly password: FieldRef<"Usuario", 'String'>
    readonly rol: FieldRef<"Usuario", 'String'>
    readonly verificado: FieldRef<"Usuario", 'Boolean'>
    readonly createdAt: FieldRef<"Usuario", 'DateTime'>
    readonly updatedAt: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.deviceTokens
   */
  export type Usuario$deviceTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
    where?: DeviceTokenWhereInput
    orderBy?: DeviceTokenOrderByWithRelationInput | DeviceTokenOrderByWithRelationInput[]
    cursor?: DeviceTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceTokenScalarFieldEnum | DeviceTokenScalarFieldEnum[]
  }

  /**
   * Usuario.preferencias
   */
  export type Usuario$preferenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    where?: PreferenciaUsuarioCarreraWhereInput
    orderBy?: PreferenciaUsuarioCarreraOrderByWithRelationInput | PreferenciaUsuarioCarreraOrderByWithRelationInput[]
    cursor?: PreferenciaUsuarioCarreraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PreferenciaUsuarioCarreraScalarFieldEnum | PreferenciaUsuarioCarreraScalarFieldEnum[]
  }

  /**
   * Usuario.userCodes
   */
  export type Usuario$userCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
    where?: UserCodeWhereInput
    orderBy?: UserCodeOrderByWithRelationInput | UserCodeOrderByWithRelationInput[]
    cursor?: UserCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCodeScalarFieldEnum | UserCodeScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Carrera
   */

  export type AggregateCarrera = {
    _count: CarreraCountAggregateOutputType | null
    _avg: CarreraAvgAggregateOutputType | null
    _sum: CarreraSumAggregateOutputType | null
    _min: CarreraMinAggregateOutputType | null
    _max: CarreraMaxAggregateOutputType | null
  }

  export type CarreraAvgAggregateOutputType = {
    id: number | null
  }

  export type CarreraSumAggregateOutputType = {
    id: number | null
  }

  export type CarreraMinAggregateOutputType = {
    id: number | null
    apiId: string | null
    nombre: string | null
  }

  export type CarreraMaxAggregateOutputType = {
    id: number | null
    apiId: string | null
    nombre: string | null
  }

  export type CarreraCountAggregateOutputType = {
    id: number
    apiId: number
    nombre: number
    _all: number
  }


  export type CarreraAvgAggregateInputType = {
    id?: true
  }

  export type CarreraSumAggregateInputType = {
    id?: true
  }

  export type CarreraMinAggregateInputType = {
    id?: true
    apiId?: true
    nombre?: true
  }

  export type CarreraMaxAggregateInputType = {
    id?: true
    apiId?: true
    nombre?: true
  }

  export type CarreraCountAggregateInputType = {
    id?: true
    apiId?: true
    nombre?: true
    _all?: true
  }

  export type CarreraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carrera to aggregate.
     */
    where?: CarreraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carreras to fetch.
     */
    orderBy?: CarreraOrderByWithRelationInput | CarreraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CarreraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carreras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carreras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Carreras
    **/
    _count?: true | CarreraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarreraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarreraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarreraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarreraMaxAggregateInputType
  }

  export type GetCarreraAggregateType<T extends CarreraAggregateArgs> = {
        [P in keyof T & keyof AggregateCarrera]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCarrera[P]>
      : GetScalarType<T[P], AggregateCarrera[P]>
  }




  export type CarreraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarreraWhereInput
    orderBy?: CarreraOrderByWithAggregationInput | CarreraOrderByWithAggregationInput[]
    by: CarreraScalarFieldEnum[] | CarreraScalarFieldEnum
    having?: CarreraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarreraCountAggregateInputType | true
    _avg?: CarreraAvgAggregateInputType
    _sum?: CarreraSumAggregateInputType
    _min?: CarreraMinAggregateInputType
    _max?: CarreraMaxAggregateInputType
  }

  export type CarreraGroupByOutputType = {
    id: number
    apiId: string
    nombre: string
    _count: CarreraCountAggregateOutputType | null
    _avg: CarreraAvgAggregateOutputType | null
    _sum: CarreraSumAggregateOutputType | null
    _min: CarreraMinAggregateOutputType | null
    _max: CarreraMaxAggregateOutputType | null
  }

  type GetCarreraGroupByPayload<T extends CarreraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarreraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarreraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarreraGroupByOutputType[P]>
            : GetScalarType<T[P], CarreraGroupByOutputType[P]>
        }
      >
    >


  export type CarreraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    apiId?: boolean
    nombre?: boolean
    usuariosConPreferencia?: boolean | Carrera$usuariosConPreferenciaArgs<ExtArgs>
    _count?: boolean | CarreraCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carrera"]>

  export type CarreraSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    apiId?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["carrera"]>

  export type CarreraSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    apiId?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["carrera"]>

  export type CarreraSelectScalar = {
    id?: boolean
    apiId?: boolean
    nombre?: boolean
  }

  export type CarreraOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "apiId" | "nombre", ExtArgs["result"]["carrera"]>
  export type CarreraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuariosConPreferencia?: boolean | Carrera$usuariosConPreferenciaArgs<ExtArgs>
    _count?: boolean | CarreraCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CarreraIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CarreraIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CarreraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Carrera"
    objects: {
      usuariosConPreferencia: Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      apiId: string
      nombre: string
    }, ExtArgs["result"]["carrera"]>
    composites: {}
  }

  type CarreraGetPayload<S extends boolean | null | undefined | CarreraDefaultArgs> = $Result.GetResult<Prisma.$CarreraPayload, S>

  type CarreraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CarreraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CarreraCountAggregateInputType | true
    }

  export interface CarreraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Carrera'], meta: { name: 'Carrera' } }
    /**
     * Find zero or one Carrera that matches the filter.
     * @param {CarreraFindUniqueArgs} args - Arguments to find a Carrera
     * @example
     * // Get one Carrera
     * const carrera = await prisma.carrera.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CarreraFindUniqueArgs>(args: SelectSubset<T, CarreraFindUniqueArgs<ExtArgs>>): Prisma__CarreraClient<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Carrera that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CarreraFindUniqueOrThrowArgs} args - Arguments to find a Carrera
     * @example
     * // Get one Carrera
     * const carrera = await prisma.carrera.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CarreraFindUniqueOrThrowArgs>(args: SelectSubset<T, CarreraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CarreraClient<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Carrera that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarreraFindFirstArgs} args - Arguments to find a Carrera
     * @example
     * // Get one Carrera
     * const carrera = await prisma.carrera.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CarreraFindFirstArgs>(args?: SelectSubset<T, CarreraFindFirstArgs<ExtArgs>>): Prisma__CarreraClient<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Carrera that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarreraFindFirstOrThrowArgs} args - Arguments to find a Carrera
     * @example
     * // Get one Carrera
     * const carrera = await prisma.carrera.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CarreraFindFirstOrThrowArgs>(args?: SelectSubset<T, CarreraFindFirstOrThrowArgs<ExtArgs>>): Prisma__CarreraClient<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Carreras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarreraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carreras
     * const carreras = await prisma.carrera.findMany()
     * 
     * // Get first 10 Carreras
     * const carreras = await prisma.carrera.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const carreraWithIdOnly = await prisma.carrera.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CarreraFindManyArgs>(args?: SelectSubset<T, CarreraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Carrera.
     * @param {CarreraCreateArgs} args - Arguments to create a Carrera.
     * @example
     * // Create one Carrera
     * const Carrera = await prisma.carrera.create({
     *   data: {
     *     // ... data to create a Carrera
     *   }
     * })
     * 
     */
    create<T extends CarreraCreateArgs>(args: SelectSubset<T, CarreraCreateArgs<ExtArgs>>): Prisma__CarreraClient<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Carreras.
     * @param {CarreraCreateManyArgs} args - Arguments to create many Carreras.
     * @example
     * // Create many Carreras
     * const carrera = await prisma.carrera.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CarreraCreateManyArgs>(args?: SelectSubset<T, CarreraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Carreras and returns the data saved in the database.
     * @param {CarreraCreateManyAndReturnArgs} args - Arguments to create many Carreras.
     * @example
     * // Create many Carreras
     * const carrera = await prisma.carrera.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Carreras and only return the `id`
     * const carreraWithIdOnly = await prisma.carrera.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CarreraCreateManyAndReturnArgs>(args?: SelectSubset<T, CarreraCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Carrera.
     * @param {CarreraDeleteArgs} args - Arguments to delete one Carrera.
     * @example
     * // Delete one Carrera
     * const Carrera = await prisma.carrera.delete({
     *   where: {
     *     // ... filter to delete one Carrera
     *   }
     * })
     * 
     */
    delete<T extends CarreraDeleteArgs>(args: SelectSubset<T, CarreraDeleteArgs<ExtArgs>>): Prisma__CarreraClient<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Carrera.
     * @param {CarreraUpdateArgs} args - Arguments to update one Carrera.
     * @example
     * // Update one Carrera
     * const carrera = await prisma.carrera.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CarreraUpdateArgs>(args: SelectSubset<T, CarreraUpdateArgs<ExtArgs>>): Prisma__CarreraClient<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Carreras.
     * @param {CarreraDeleteManyArgs} args - Arguments to filter Carreras to delete.
     * @example
     * // Delete a few Carreras
     * const { count } = await prisma.carrera.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CarreraDeleteManyArgs>(args?: SelectSubset<T, CarreraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carreras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarreraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carreras
     * const carrera = await prisma.carrera.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CarreraUpdateManyArgs>(args: SelectSubset<T, CarreraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carreras and returns the data updated in the database.
     * @param {CarreraUpdateManyAndReturnArgs} args - Arguments to update many Carreras.
     * @example
     * // Update many Carreras
     * const carrera = await prisma.carrera.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Carreras and only return the `id`
     * const carreraWithIdOnly = await prisma.carrera.updateManyAndReturn({
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
    updateManyAndReturn<T extends CarreraUpdateManyAndReturnArgs>(args: SelectSubset<T, CarreraUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Carrera.
     * @param {CarreraUpsertArgs} args - Arguments to update or create a Carrera.
     * @example
     * // Update or create a Carrera
     * const carrera = await prisma.carrera.upsert({
     *   create: {
     *     // ... data to create a Carrera
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Carrera we want to update
     *   }
     * })
     */
    upsert<T extends CarreraUpsertArgs>(args: SelectSubset<T, CarreraUpsertArgs<ExtArgs>>): Prisma__CarreraClient<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Carreras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarreraCountArgs} args - Arguments to filter Carreras to count.
     * @example
     * // Count the number of Carreras
     * const count = await prisma.carrera.count({
     *   where: {
     *     // ... the filter for the Carreras we want to count
     *   }
     * })
    **/
    count<T extends CarreraCountArgs>(
      args?: Subset<T, CarreraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarreraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Carrera.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarreraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CarreraAggregateArgs>(args: Subset<T, CarreraAggregateArgs>): Prisma.PrismaPromise<GetCarreraAggregateType<T>>

    /**
     * Group by Carrera.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarreraGroupByArgs} args - Group by arguments.
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
      T extends CarreraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CarreraGroupByArgs['orderBy'] }
        : { orderBy?: CarreraGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CarreraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarreraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Carrera model
   */
  readonly fields: CarreraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Carrera.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CarreraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuariosConPreferencia<T extends Carrera$usuariosConPreferenciaArgs<ExtArgs> = {}>(args?: Subset<T, Carrera$usuariosConPreferenciaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Carrera model
   */
  interface CarreraFieldRefs {
    readonly id: FieldRef<"Carrera", 'Int'>
    readonly apiId: FieldRef<"Carrera", 'String'>
    readonly nombre: FieldRef<"Carrera", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Carrera findUnique
   */
  export type CarreraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarreraInclude<ExtArgs> | null
    /**
     * Filter, which Carrera to fetch.
     */
    where: CarreraWhereUniqueInput
  }

  /**
   * Carrera findUniqueOrThrow
   */
  export type CarreraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarreraInclude<ExtArgs> | null
    /**
     * Filter, which Carrera to fetch.
     */
    where: CarreraWhereUniqueInput
  }

  /**
   * Carrera findFirst
   */
  export type CarreraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarreraInclude<ExtArgs> | null
    /**
     * Filter, which Carrera to fetch.
     */
    where?: CarreraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carreras to fetch.
     */
    orderBy?: CarreraOrderByWithRelationInput | CarreraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carreras.
     */
    cursor?: CarreraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carreras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carreras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carreras.
     */
    distinct?: CarreraScalarFieldEnum | CarreraScalarFieldEnum[]
  }

  /**
   * Carrera findFirstOrThrow
   */
  export type CarreraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarreraInclude<ExtArgs> | null
    /**
     * Filter, which Carrera to fetch.
     */
    where?: CarreraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carreras to fetch.
     */
    orderBy?: CarreraOrderByWithRelationInput | CarreraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carreras.
     */
    cursor?: CarreraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carreras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carreras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carreras.
     */
    distinct?: CarreraScalarFieldEnum | CarreraScalarFieldEnum[]
  }

  /**
   * Carrera findMany
   */
  export type CarreraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarreraInclude<ExtArgs> | null
    /**
     * Filter, which Carreras to fetch.
     */
    where?: CarreraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carreras to fetch.
     */
    orderBy?: CarreraOrderByWithRelationInput | CarreraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Carreras.
     */
    cursor?: CarreraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carreras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carreras.
     */
    skip?: number
    distinct?: CarreraScalarFieldEnum | CarreraScalarFieldEnum[]
  }

  /**
   * Carrera create
   */
  export type CarreraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarreraInclude<ExtArgs> | null
    /**
     * The data needed to create a Carrera.
     */
    data: XOR<CarreraCreateInput, CarreraUncheckedCreateInput>
  }

  /**
   * Carrera createMany
   */
  export type CarreraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Carreras.
     */
    data: CarreraCreateManyInput | CarreraCreateManyInput[]
  }

  /**
   * Carrera createManyAndReturn
   */
  export type CarreraCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * The data used to create many Carreras.
     */
    data: CarreraCreateManyInput | CarreraCreateManyInput[]
  }

  /**
   * Carrera update
   */
  export type CarreraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarreraInclude<ExtArgs> | null
    /**
     * The data needed to update a Carrera.
     */
    data: XOR<CarreraUpdateInput, CarreraUncheckedUpdateInput>
    /**
     * Choose, which Carrera to update.
     */
    where: CarreraWhereUniqueInput
  }

  /**
   * Carrera updateMany
   */
  export type CarreraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Carreras.
     */
    data: XOR<CarreraUpdateManyMutationInput, CarreraUncheckedUpdateManyInput>
    /**
     * Filter which Carreras to update
     */
    where?: CarreraWhereInput
    /**
     * Limit how many Carreras to update.
     */
    limit?: number
  }

  /**
   * Carrera updateManyAndReturn
   */
  export type CarreraUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * The data used to update Carreras.
     */
    data: XOR<CarreraUpdateManyMutationInput, CarreraUncheckedUpdateManyInput>
    /**
     * Filter which Carreras to update
     */
    where?: CarreraWhereInput
    /**
     * Limit how many Carreras to update.
     */
    limit?: number
  }

  /**
   * Carrera upsert
   */
  export type CarreraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarreraInclude<ExtArgs> | null
    /**
     * The filter to search for the Carrera to update in case it exists.
     */
    where: CarreraWhereUniqueInput
    /**
     * In case the Carrera found by the `where` argument doesn't exist, create a new Carrera with this data.
     */
    create: XOR<CarreraCreateInput, CarreraUncheckedCreateInput>
    /**
     * In case the Carrera was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CarreraUpdateInput, CarreraUncheckedUpdateInput>
  }

  /**
   * Carrera delete
   */
  export type CarreraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarreraInclude<ExtArgs> | null
    /**
     * Filter which Carrera to delete.
     */
    where: CarreraWhereUniqueInput
  }

  /**
   * Carrera deleteMany
   */
  export type CarreraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carreras to delete
     */
    where?: CarreraWhereInput
    /**
     * Limit how many Carreras to delete.
     */
    limit?: number
  }

  /**
   * Carrera.usuariosConPreferencia
   */
  export type Carrera$usuariosConPreferenciaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    where?: PreferenciaUsuarioCarreraWhereInput
    orderBy?: PreferenciaUsuarioCarreraOrderByWithRelationInput | PreferenciaUsuarioCarreraOrderByWithRelationInput[]
    cursor?: PreferenciaUsuarioCarreraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PreferenciaUsuarioCarreraScalarFieldEnum | PreferenciaUsuarioCarreraScalarFieldEnum[]
  }

  /**
   * Carrera without action
   */
  export type CarreraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carrera
     */
    select?: CarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Carrera
     */
    omit?: CarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarreraInclude<ExtArgs> | null
  }


  /**
   * Model PreferenciaUsuarioCarrera
   */

  export type AggregatePreferenciaUsuarioCarrera = {
    _count: PreferenciaUsuarioCarreraCountAggregateOutputType | null
    _avg: PreferenciaUsuarioCarreraAvgAggregateOutputType | null
    _sum: PreferenciaUsuarioCarreraSumAggregateOutputType | null
    _min: PreferenciaUsuarioCarreraMinAggregateOutputType | null
    _max: PreferenciaUsuarioCarreraMaxAggregateOutputType | null
  }

  export type PreferenciaUsuarioCarreraAvgAggregateOutputType = {
    usuarioId: number | null
    carreraId: number | null
  }

  export type PreferenciaUsuarioCarreraSumAggregateOutputType = {
    usuarioId: number | null
    carreraId: number | null
  }

  export type PreferenciaUsuarioCarreraMinAggregateOutputType = {
    usuarioId: number | null
    carreraId: number | null
    createdAt: Date | null
  }

  export type PreferenciaUsuarioCarreraMaxAggregateOutputType = {
    usuarioId: number | null
    carreraId: number | null
    createdAt: Date | null
  }

  export type PreferenciaUsuarioCarreraCountAggregateOutputType = {
    usuarioId: number
    carreraId: number
    createdAt: number
    _all: number
  }


  export type PreferenciaUsuarioCarreraAvgAggregateInputType = {
    usuarioId?: true
    carreraId?: true
  }

  export type PreferenciaUsuarioCarreraSumAggregateInputType = {
    usuarioId?: true
    carreraId?: true
  }

  export type PreferenciaUsuarioCarreraMinAggregateInputType = {
    usuarioId?: true
    carreraId?: true
    createdAt?: true
  }

  export type PreferenciaUsuarioCarreraMaxAggregateInputType = {
    usuarioId?: true
    carreraId?: true
    createdAt?: true
  }

  export type PreferenciaUsuarioCarreraCountAggregateInputType = {
    usuarioId?: true
    carreraId?: true
    createdAt?: true
    _all?: true
  }

  export type PreferenciaUsuarioCarreraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreferenciaUsuarioCarrera to aggregate.
     */
    where?: PreferenciaUsuarioCarreraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreferenciaUsuarioCarreras to fetch.
     */
    orderBy?: PreferenciaUsuarioCarreraOrderByWithRelationInput | PreferenciaUsuarioCarreraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreferenciaUsuarioCarreraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreferenciaUsuarioCarreras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreferenciaUsuarioCarreras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreferenciaUsuarioCarreras
    **/
    _count?: true | PreferenciaUsuarioCarreraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreferenciaUsuarioCarreraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreferenciaUsuarioCarreraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreferenciaUsuarioCarreraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreferenciaUsuarioCarreraMaxAggregateInputType
  }

  export type GetPreferenciaUsuarioCarreraAggregateType<T extends PreferenciaUsuarioCarreraAggregateArgs> = {
        [P in keyof T & keyof AggregatePreferenciaUsuarioCarrera]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreferenciaUsuarioCarrera[P]>
      : GetScalarType<T[P], AggregatePreferenciaUsuarioCarrera[P]>
  }




  export type PreferenciaUsuarioCarreraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreferenciaUsuarioCarreraWhereInput
    orderBy?: PreferenciaUsuarioCarreraOrderByWithAggregationInput | PreferenciaUsuarioCarreraOrderByWithAggregationInput[]
    by: PreferenciaUsuarioCarreraScalarFieldEnum[] | PreferenciaUsuarioCarreraScalarFieldEnum
    having?: PreferenciaUsuarioCarreraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreferenciaUsuarioCarreraCountAggregateInputType | true
    _avg?: PreferenciaUsuarioCarreraAvgAggregateInputType
    _sum?: PreferenciaUsuarioCarreraSumAggregateInputType
    _min?: PreferenciaUsuarioCarreraMinAggregateInputType
    _max?: PreferenciaUsuarioCarreraMaxAggregateInputType
  }

  export type PreferenciaUsuarioCarreraGroupByOutputType = {
    usuarioId: number
    carreraId: number
    createdAt: Date
    _count: PreferenciaUsuarioCarreraCountAggregateOutputType | null
    _avg: PreferenciaUsuarioCarreraAvgAggregateOutputType | null
    _sum: PreferenciaUsuarioCarreraSumAggregateOutputType | null
    _min: PreferenciaUsuarioCarreraMinAggregateOutputType | null
    _max: PreferenciaUsuarioCarreraMaxAggregateOutputType | null
  }

  type GetPreferenciaUsuarioCarreraGroupByPayload<T extends PreferenciaUsuarioCarreraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreferenciaUsuarioCarreraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreferenciaUsuarioCarreraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreferenciaUsuarioCarreraGroupByOutputType[P]>
            : GetScalarType<T[P], PreferenciaUsuarioCarreraGroupByOutputType[P]>
        }
      >
    >


  export type PreferenciaUsuarioCarreraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuarioId?: boolean
    carreraId?: boolean
    createdAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    carrera?: boolean | CarreraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preferenciaUsuarioCarrera"]>

  export type PreferenciaUsuarioCarreraSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuarioId?: boolean
    carreraId?: boolean
    createdAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    carrera?: boolean | CarreraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preferenciaUsuarioCarrera"]>

  export type PreferenciaUsuarioCarreraSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuarioId?: boolean
    carreraId?: boolean
    createdAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    carrera?: boolean | CarreraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preferenciaUsuarioCarrera"]>

  export type PreferenciaUsuarioCarreraSelectScalar = {
    usuarioId?: boolean
    carreraId?: boolean
    createdAt?: boolean
  }

  export type PreferenciaUsuarioCarreraOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"usuarioId" | "carreraId" | "createdAt", ExtArgs["result"]["preferenciaUsuarioCarrera"]>
  export type PreferenciaUsuarioCarreraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    carrera?: boolean | CarreraDefaultArgs<ExtArgs>
  }
  export type PreferenciaUsuarioCarreraIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    carrera?: boolean | CarreraDefaultArgs<ExtArgs>
  }
  export type PreferenciaUsuarioCarreraIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    carrera?: boolean | CarreraDefaultArgs<ExtArgs>
  }

  export type $PreferenciaUsuarioCarreraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PreferenciaUsuarioCarrera"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      carrera: Prisma.$CarreraPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      usuarioId: number
      carreraId: number
      createdAt: Date
    }, ExtArgs["result"]["preferenciaUsuarioCarrera"]>
    composites: {}
  }

  type PreferenciaUsuarioCarreraGetPayload<S extends boolean | null | undefined | PreferenciaUsuarioCarreraDefaultArgs> = $Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload, S>

  type PreferenciaUsuarioCarreraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreferenciaUsuarioCarreraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreferenciaUsuarioCarreraCountAggregateInputType | true
    }

  export interface PreferenciaUsuarioCarreraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PreferenciaUsuarioCarrera'], meta: { name: 'PreferenciaUsuarioCarrera' } }
    /**
     * Find zero or one PreferenciaUsuarioCarrera that matches the filter.
     * @param {PreferenciaUsuarioCarreraFindUniqueArgs} args - Arguments to find a PreferenciaUsuarioCarrera
     * @example
     * // Get one PreferenciaUsuarioCarrera
     * const preferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreferenciaUsuarioCarreraFindUniqueArgs>(args: SelectSubset<T, PreferenciaUsuarioCarreraFindUniqueArgs<ExtArgs>>): Prisma__PreferenciaUsuarioCarreraClient<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PreferenciaUsuarioCarrera that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreferenciaUsuarioCarreraFindUniqueOrThrowArgs} args - Arguments to find a PreferenciaUsuarioCarrera
     * @example
     * // Get one PreferenciaUsuarioCarrera
     * const preferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreferenciaUsuarioCarreraFindUniqueOrThrowArgs>(args: SelectSubset<T, PreferenciaUsuarioCarreraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreferenciaUsuarioCarreraClient<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreferenciaUsuarioCarrera that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenciaUsuarioCarreraFindFirstArgs} args - Arguments to find a PreferenciaUsuarioCarrera
     * @example
     * // Get one PreferenciaUsuarioCarrera
     * const preferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreferenciaUsuarioCarreraFindFirstArgs>(args?: SelectSubset<T, PreferenciaUsuarioCarreraFindFirstArgs<ExtArgs>>): Prisma__PreferenciaUsuarioCarreraClient<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreferenciaUsuarioCarrera that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenciaUsuarioCarreraFindFirstOrThrowArgs} args - Arguments to find a PreferenciaUsuarioCarrera
     * @example
     * // Get one PreferenciaUsuarioCarrera
     * const preferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreferenciaUsuarioCarreraFindFirstOrThrowArgs>(args?: SelectSubset<T, PreferenciaUsuarioCarreraFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreferenciaUsuarioCarreraClient<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PreferenciaUsuarioCarreras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenciaUsuarioCarreraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreferenciaUsuarioCarreras
     * const preferenciaUsuarioCarreras = await prisma.preferenciaUsuarioCarrera.findMany()
     * 
     * // Get first 10 PreferenciaUsuarioCarreras
     * const preferenciaUsuarioCarreras = await prisma.preferenciaUsuarioCarrera.findMany({ take: 10 })
     * 
     * // Only select the `usuarioId`
     * const preferenciaUsuarioCarreraWithUsuarioIdOnly = await prisma.preferenciaUsuarioCarrera.findMany({ select: { usuarioId: true } })
     * 
     */
    findMany<T extends PreferenciaUsuarioCarreraFindManyArgs>(args?: SelectSubset<T, PreferenciaUsuarioCarreraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PreferenciaUsuarioCarrera.
     * @param {PreferenciaUsuarioCarreraCreateArgs} args - Arguments to create a PreferenciaUsuarioCarrera.
     * @example
     * // Create one PreferenciaUsuarioCarrera
     * const PreferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.create({
     *   data: {
     *     // ... data to create a PreferenciaUsuarioCarrera
     *   }
     * })
     * 
     */
    create<T extends PreferenciaUsuarioCarreraCreateArgs>(args: SelectSubset<T, PreferenciaUsuarioCarreraCreateArgs<ExtArgs>>): Prisma__PreferenciaUsuarioCarreraClient<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PreferenciaUsuarioCarreras.
     * @param {PreferenciaUsuarioCarreraCreateManyArgs} args - Arguments to create many PreferenciaUsuarioCarreras.
     * @example
     * // Create many PreferenciaUsuarioCarreras
     * const preferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreferenciaUsuarioCarreraCreateManyArgs>(args?: SelectSubset<T, PreferenciaUsuarioCarreraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PreferenciaUsuarioCarreras and returns the data saved in the database.
     * @param {PreferenciaUsuarioCarreraCreateManyAndReturnArgs} args - Arguments to create many PreferenciaUsuarioCarreras.
     * @example
     * // Create many PreferenciaUsuarioCarreras
     * const preferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PreferenciaUsuarioCarreras and only return the `usuarioId`
     * const preferenciaUsuarioCarreraWithUsuarioIdOnly = await prisma.preferenciaUsuarioCarrera.createManyAndReturn({
     *   select: { usuarioId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreferenciaUsuarioCarreraCreateManyAndReturnArgs>(args?: SelectSubset<T, PreferenciaUsuarioCarreraCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PreferenciaUsuarioCarrera.
     * @param {PreferenciaUsuarioCarreraDeleteArgs} args - Arguments to delete one PreferenciaUsuarioCarrera.
     * @example
     * // Delete one PreferenciaUsuarioCarrera
     * const PreferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.delete({
     *   where: {
     *     // ... filter to delete one PreferenciaUsuarioCarrera
     *   }
     * })
     * 
     */
    delete<T extends PreferenciaUsuarioCarreraDeleteArgs>(args: SelectSubset<T, PreferenciaUsuarioCarreraDeleteArgs<ExtArgs>>): Prisma__PreferenciaUsuarioCarreraClient<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PreferenciaUsuarioCarrera.
     * @param {PreferenciaUsuarioCarreraUpdateArgs} args - Arguments to update one PreferenciaUsuarioCarrera.
     * @example
     * // Update one PreferenciaUsuarioCarrera
     * const preferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreferenciaUsuarioCarreraUpdateArgs>(args: SelectSubset<T, PreferenciaUsuarioCarreraUpdateArgs<ExtArgs>>): Prisma__PreferenciaUsuarioCarreraClient<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PreferenciaUsuarioCarreras.
     * @param {PreferenciaUsuarioCarreraDeleteManyArgs} args - Arguments to filter PreferenciaUsuarioCarreras to delete.
     * @example
     * // Delete a few PreferenciaUsuarioCarreras
     * const { count } = await prisma.preferenciaUsuarioCarrera.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreferenciaUsuarioCarreraDeleteManyArgs>(args?: SelectSubset<T, PreferenciaUsuarioCarreraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreferenciaUsuarioCarreras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenciaUsuarioCarreraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreferenciaUsuarioCarreras
     * const preferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreferenciaUsuarioCarreraUpdateManyArgs>(args: SelectSubset<T, PreferenciaUsuarioCarreraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreferenciaUsuarioCarreras and returns the data updated in the database.
     * @param {PreferenciaUsuarioCarreraUpdateManyAndReturnArgs} args - Arguments to update many PreferenciaUsuarioCarreras.
     * @example
     * // Update many PreferenciaUsuarioCarreras
     * const preferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PreferenciaUsuarioCarreras and only return the `usuarioId`
     * const preferenciaUsuarioCarreraWithUsuarioIdOnly = await prisma.preferenciaUsuarioCarrera.updateManyAndReturn({
     *   select: { usuarioId: true },
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
    updateManyAndReturn<T extends PreferenciaUsuarioCarreraUpdateManyAndReturnArgs>(args: SelectSubset<T, PreferenciaUsuarioCarreraUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PreferenciaUsuarioCarrera.
     * @param {PreferenciaUsuarioCarreraUpsertArgs} args - Arguments to update or create a PreferenciaUsuarioCarrera.
     * @example
     * // Update or create a PreferenciaUsuarioCarrera
     * const preferenciaUsuarioCarrera = await prisma.preferenciaUsuarioCarrera.upsert({
     *   create: {
     *     // ... data to create a PreferenciaUsuarioCarrera
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreferenciaUsuarioCarrera we want to update
     *   }
     * })
     */
    upsert<T extends PreferenciaUsuarioCarreraUpsertArgs>(args: SelectSubset<T, PreferenciaUsuarioCarreraUpsertArgs<ExtArgs>>): Prisma__PreferenciaUsuarioCarreraClient<$Result.GetResult<Prisma.$PreferenciaUsuarioCarreraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PreferenciaUsuarioCarreras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenciaUsuarioCarreraCountArgs} args - Arguments to filter PreferenciaUsuarioCarreras to count.
     * @example
     * // Count the number of PreferenciaUsuarioCarreras
     * const count = await prisma.preferenciaUsuarioCarrera.count({
     *   where: {
     *     // ... the filter for the PreferenciaUsuarioCarreras we want to count
     *   }
     * })
    **/
    count<T extends PreferenciaUsuarioCarreraCountArgs>(
      args?: Subset<T, PreferenciaUsuarioCarreraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreferenciaUsuarioCarreraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreferenciaUsuarioCarrera.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenciaUsuarioCarreraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PreferenciaUsuarioCarreraAggregateArgs>(args: Subset<T, PreferenciaUsuarioCarreraAggregateArgs>): Prisma.PrismaPromise<GetPreferenciaUsuarioCarreraAggregateType<T>>

    /**
     * Group by PreferenciaUsuarioCarrera.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenciaUsuarioCarreraGroupByArgs} args - Group by arguments.
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
      T extends PreferenciaUsuarioCarreraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreferenciaUsuarioCarreraGroupByArgs['orderBy'] }
        : { orderBy?: PreferenciaUsuarioCarreraGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PreferenciaUsuarioCarreraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreferenciaUsuarioCarreraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PreferenciaUsuarioCarrera model
   */
  readonly fields: PreferenciaUsuarioCarreraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PreferenciaUsuarioCarrera.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreferenciaUsuarioCarreraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    carrera<T extends CarreraDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CarreraDefaultArgs<ExtArgs>>): Prisma__CarreraClient<$Result.GetResult<Prisma.$CarreraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PreferenciaUsuarioCarrera model
   */
  interface PreferenciaUsuarioCarreraFieldRefs {
    readonly usuarioId: FieldRef<"PreferenciaUsuarioCarrera", 'Int'>
    readonly carreraId: FieldRef<"PreferenciaUsuarioCarrera", 'Int'>
    readonly createdAt: FieldRef<"PreferenciaUsuarioCarrera", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PreferenciaUsuarioCarrera findUnique
   */
  export type PreferenciaUsuarioCarreraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    /**
     * Filter, which PreferenciaUsuarioCarrera to fetch.
     */
    where: PreferenciaUsuarioCarreraWhereUniqueInput
  }

  /**
   * PreferenciaUsuarioCarrera findUniqueOrThrow
   */
  export type PreferenciaUsuarioCarreraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    /**
     * Filter, which PreferenciaUsuarioCarrera to fetch.
     */
    where: PreferenciaUsuarioCarreraWhereUniqueInput
  }

  /**
   * PreferenciaUsuarioCarrera findFirst
   */
  export type PreferenciaUsuarioCarreraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    /**
     * Filter, which PreferenciaUsuarioCarrera to fetch.
     */
    where?: PreferenciaUsuarioCarreraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreferenciaUsuarioCarreras to fetch.
     */
    orderBy?: PreferenciaUsuarioCarreraOrderByWithRelationInput | PreferenciaUsuarioCarreraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreferenciaUsuarioCarreras.
     */
    cursor?: PreferenciaUsuarioCarreraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreferenciaUsuarioCarreras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreferenciaUsuarioCarreras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreferenciaUsuarioCarreras.
     */
    distinct?: PreferenciaUsuarioCarreraScalarFieldEnum | PreferenciaUsuarioCarreraScalarFieldEnum[]
  }

  /**
   * PreferenciaUsuarioCarrera findFirstOrThrow
   */
  export type PreferenciaUsuarioCarreraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    /**
     * Filter, which PreferenciaUsuarioCarrera to fetch.
     */
    where?: PreferenciaUsuarioCarreraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreferenciaUsuarioCarreras to fetch.
     */
    orderBy?: PreferenciaUsuarioCarreraOrderByWithRelationInput | PreferenciaUsuarioCarreraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreferenciaUsuarioCarreras.
     */
    cursor?: PreferenciaUsuarioCarreraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreferenciaUsuarioCarreras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreferenciaUsuarioCarreras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreferenciaUsuarioCarreras.
     */
    distinct?: PreferenciaUsuarioCarreraScalarFieldEnum | PreferenciaUsuarioCarreraScalarFieldEnum[]
  }

  /**
   * PreferenciaUsuarioCarrera findMany
   */
  export type PreferenciaUsuarioCarreraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    /**
     * Filter, which PreferenciaUsuarioCarreras to fetch.
     */
    where?: PreferenciaUsuarioCarreraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreferenciaUsuarioCarreras to fetch.
     */
    orderBy?: PreferenciaUsuarioCarreraOrderByWithRelationInput | PreferenciaUsuarioCarreraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreferenciaUsuarioCarreras.
     */
    cursor?: PreferenciaUsuarioCarreraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreferenciaUsuarioCarreras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreferenciaUsuarioCarreras.
     */
    skip?: number
    distinct?: PreferenciaUsuarioCarreraScalarFieldEnum | PreferenciaUsuarioCarreraScalarFieldEnum[]
  }

  /**
   * PreferenciaUsuarioCarrera create
   */
  export type PreferenciaUsuarioCarreraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    /**
     * The data needed to create a PreferenciaUsuarioCarrera.
     */
    data: XOR<PreferenciaUsuarioCarreraCreateInput, PreferenciaUsuarioCarreraUncheckedCreateInput>
  }

  /**
   * PreferenciaUsuarioCarrera createMany
   */
  export type PreferenciaUsuarioCarreraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PreferenciaUsuarioCarreras.
     */
    data: PreferenciaUsuarioCarreraCreateManyInput | PreferenciaUsuarioCarreraCreateManyInput[]
  }

  /**
   * PreferenciaUsuarioCarrera createManyAndReturn
   */
  export type PreferenciaUsuarioCarreraCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * The data used to create many PreferenciaUsuarioCarreras.
     */
    data: PreferenciaUsuarioCarreraCreateManyInput | PreferenciaUsuarioCarreraCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PreferenciaUsuarioCarrera update
   */
  export type PreferenciaUsuarioCarreraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    /**
     * The data needed to update a PreferenciaUsuarioCarrera.
     */
    data: XOR<PreferenciaUsuarioCarreraUpdateInput, PreferenciaUsuarioCarreraUncheckedUpdateInput>
    /**
     * Choose, which PreferenciaUsuarioCarrera to update.
     */
    where: PreferenciaUsuarioCarreraWhereUniqueInput
  }

  /**
   * PreferenciaUsuarioCarrera updateMany
   */
  export type PreferenciaUsuarioCarreraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PreferenciaUsuarioCarreras.
     */
    data: XOR<PreferenciaUsuarioCarreraUpdateManyMutationInput, PreferenciaUsuarioCarreraUncheckedUpdateManyInput>
    /**
     * Filter which PreferenciaUsuarioCarreras to update
     */
    where?: PreferenciaUsuarioCarreraWhereInput
    /**
     * Limit how many PreferenciaUsuarioCarreras to update.
     */
    limit?: number
  }

  /**
   * PreferenciaUsuarioCarrera updateManyAndReturn
   */
  export type PreferenciaUsuarioCarreraUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * The data used to update PreferenciaUsuarioCarreras.
     */
    data: XOR<PreferenciaUsuarioCarreraUpdateManyMutationInput, PreferenciaUsuarioCarreraUncheckedUpdateManyInput>
    /**
     * Filter which PreferenciaUsuarioCarreras to update
     */
    where?: PreferenciaUsuarioCarreraWhereInput
    /**
     * Limit how many PreferenciaUsuarioCarreras to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PreferenciaUsuarioCarrera upsert
   */
  export type PreferenciaUsuarioCarreraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    /**
     * The filter to search for the PreferenciaUsuarioCarrera to update in case it exists.
     */
    where: PreferenciaUsuarioCarreraWhereUniqueInput
    /**
     * In case the PreferenciaUsuarioCarrera found by the `where` argument doesn't exist, create a new PreferenciaUsuarioCarrera with this data.
     */
    create: XOR<PreferenciaUsuarioCarreraCreateInput, PreferenciaUsuarioCarreraUncheckedCreateInput>
    /**
     * In case the PreferenciaUsuarioCarrera was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreferenciaUsuarioCarreraUpdateInput, PreferenciaUsuarioCarreraUncheckedUpdateInput>
  }

  /**
   * PreferenciaUsuarioCarrera delete
   */
  export type PreferenciaUsuarioCarreraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
    /**
     * Filter which PreferenciaUsuarioCarrera to delete.
     */
    where: PreferenciaUsuarioCarreraWhereUniqueInput
  }

  /**
   * PreferenciaUsuarioCarrera deleteMany
   */
  export type PreferenciaUsuarioCarreraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreferenciaUsuarioCarreras to delete
     */
    where?: PreferenciaUsuarioCarreraWhereInput
    /**
     * Limit how many PreferenciaUsuarioCarreras to delete.
     */
    limit?: number
  }

  /**
   * PreferenciaUsuarioCarrera without action
   */
  export type PreferenciaUsuarioCarreraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreferenciaUsuarioCarrera
     */
    select?: PreferenciaUsuarioCarreraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreferenciaUsuarioCarrera
     */
    omit?: PreferenciaUsuarioCarreraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenciaUsuarioCarreraInclude<ExtArgs> | null
  }


  /**
   * Model DeviceToken
   */

  export type AggregateDeviceToken = {
    _count: DeviceTokenCountAggregateOutputType | null
    _avg: DeviceTokenAvgAggregateOutputType | null
    _sum: DeviceTokenSumAggregateOutputType | null
    _min: DeviceTokenMinAggregateOutputType | null
    _max: DeviceTokenMaxAggregateOutputType | null
  }

  export type DeviceTokenAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
  }

  export type DeviceTokenSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
  }

  export type DeviceTokenMinAggregateOutputType = {
    id: number | null
    token: string | null
    usuarioId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeviceTokenMaxAggregateOutputType = {
    id: number | null
    token: string | null
    usuarioId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeviceTokenCountAggregateOutputType = {
    id: number
    token: number
    usuarioId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeviceTokenAvgAggregateInputType = {
    id?: true
    usuarioId?: true
  }

  export type DeviceTokenSumAggregateInputType = {
    id?: true
    usuarioId?: true
  }

  export type DeviceTokenMinAggregateInputType = {
    id?: true
    token?: true
    usuarioId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeviceTokenMaxAggregateInputType = {
    id?: true
    token?: true
    usuarioId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeviceTokenCountAggregateInputType = {
    id?: true
    token?: true
    usuarioId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeviceTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceToken to aggregate.
     */
    where?: DeviceTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTokens to fetch.
     */
    orderBy?: DeviceTokenOrderByWithRelationInput | DeviceTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeviceTokens
    **/
    _count?: true | DeviceTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeviceTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeviceTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceTokenMaxAggregateInputType
  }

  export type GetDeviceTokenAggregateType<T extends DeviceTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateDeviceToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeviceToken[P]>
      : GetScalarType<T[P], AggregateDeviceToken[P]>
  }




  export type DeviceTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceTokenWhereInput
    orderBy?: DeviceTokenOrderByWithAggregationInput | DeviceTokenOrderByWithAggregationInput[]
    by: DeviceTokenScalarFieldEnum[] | DeviceTokenScalarFieldEnum
    having?: DeviceTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceTokenCountAggregateInputType | true
    _avg?: DeviceTokenAvgAggregateInputType
    _sum?: DeviceTokenSumAggregateInputType
    _min?: DeviceTokenMinAggregateInputType
    _max?: DeviceTokenMaxAggregateInputType
  }

  export type DeviceTokenGroupByOutputType = {
    id: number
    token: string
    usuarioId: number
    createdAt: Date
    updatedAt: Date
    _count: DeviceTokenCountAggregateOutputType | null
    _avg: DeviceTokenAvgAggregateOutputType | null
    _sum: DeviceTokenSumAggregateOutputType | null
    _min: DeviceTokenMinAggregateOutputType | null
    _max: DeviceTokenMaxAggregateOutputType | null
  }

  type GetDeviceTokenGroupByPayload<T extends DeviceTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceTokenGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceTokenGroupByOutputType[P]>
        }
      >
    >


  export type DeviceTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    usuarioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceToken"]>

  export type DeviceTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    usuarioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceToken"]>

  export type DeviceTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    usuarioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceToken"]>

  export type DeviceTokenSelectScalar = {
    id?: boolean
    token?: boolean
    usuarioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeviceTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "usuarioId" | "createdAt" | "updatedAt", ExtArgs["result"]["deviceToken"]>
  export type DeviceTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type DeviceTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type DeviceTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $DeviceTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeviceToken"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      token: string
      usuarioId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deviceToken"]>
    composites: {}
  }

  type DeviceTokenGetPayload<S extends boolean | null | undefined | DeviceTokenDefaultArgs> = $Result.GetResult<Prisma.$DeviceTokenPayload, S>

  type DeviceTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeviceTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeviceTokenCountAggregateInputType | true
    }

  export interface DeviceTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeviceToken'], meta: { name: 'DeviceToken' } }
    /**
     * Find zero or one DeviceToken that matches the filter.
     * @param {DeviceTokenFindUniqueArgs} args - Arguments to find a DeviceToken
     * @example
     * // Get one DeviceToken
     * const deviceToken = await prisma.deviceToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceTokenFindUniqueArgs>(args: SelectSubset<T, DeviceTokenFindUniqueArgs<ExtArgs>>): Prisma__DeviceTokenClient<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeviceToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeviceTokenFindUniqueOrThrowArgs} args - Arguments to find a DeviceToken
     * @example
     * // Get one DeviceToken
     * const deviceToken = await prisma.deviceToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceTokenClient<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeviceToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTokenFindFirstArgs} args - Arguments to find a DeviceToken
     * @example
     * // Get one DeviceToken
     * const deviceToken = await prisma.deviceToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceTokenFindFirstArgs>(args?: SelectSubset<T, DeviceTokenFindFirstArgs<ExtArgs>>): Prisma__DeviceTokenClient<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeviceToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTokenFindFirstOrThrowArgs} args - Arguments to find a DeviceToken
     * @example
     * // Get one DeviceToken
     * const deviceToken = await prisma.deviceToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceTokenClient<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeviceTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceTokens
     * const deviceTokens = await prisma.deviceToken.findMany()
     * 
     * // Get first 10 DeviceTokens
     * const deviceTokens = await prisma.deviceToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceTokenWithIdOnly = await prisma.deviceToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeviceTokenFindManyArgs>(args?: SelectSubset<T, DeviceTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeviceToken.
     * @param {DeviceTokenCreateArgs} args - Arguments to create a DeviceToken.
     * @example
     * // Create one DeviceToken
     * const DeviceToken = await prisma.deviceToken.create({
     *   data: {
     *     // ... data to create a DeviceToken
     *   }
     * })
     * 
     */
    create<T extends DeviceTokenCreateArgs>(args: SelectSubset<T, DeviceTokenCreateArgs<ExtArgs>>): Prisma__DeviceTokenClient<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeviceTokens.
     * @param {DeviceTokenCreateManyArgs} args - Arguments to create many DeviceTokens.
     * @example
     * // Create many DeviceTokens
     * const deviceToken = await prisma.deviceToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceTokenCreateManyArgs>(args?: SelectSubset<T, DeviceTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeviceTokens and returns the data saved in the database.
     * @param {DeviceTokenCreateManyAndReturnArgs} args - Arguments to create many DeviceTokens.
     * @example
     * // Create many DeviceTokens
     * const deviceToken = await prisma.deviceToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeviceTokens and only return the `id`
     * const deviceTokenWithIdOnly = await prisma.deviceToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeviceToken.
     * @param {DeviceTokenDeleteArgs} args - Arguments to delete one DeviceToken.
     * @example
     * // Delete one DeviceToken
     * const DeviceToken = await prisma.deviceToken.delete({
     *   where: {
     *     // ... filter to delete one DeviceToken
     *   }
     * })
     * 
     */
    delete<T extends DeviceTokenDeleteArgs>(args: SelectSubset<T, DeviceTokenDeleteArgs<ExtArgs>>): Prisma__DeviceTokenClient<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeviceToken.
     * @param {DeviceTokenUpdateArgs} args - Arguments to update one DeviceToken.
     * @example
     * // Update one DeviceToken
     * const deviceToken = await prisma.deviceToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceTokenUpdateArgs>(args: SelectSubset<T, DeviceTokenUpdateArgs<ExtArgs>>): Prisma__DeviceTokenClient<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeviceTokens.
     * @param {DeviceTokenDeleteManyArgs} args - Arguments to filter DeviceTokens to delete.
     * @example
     * // Delete a few DeviceTokens
     * const { count } = await prisma.deviceToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceTokenDeleteManyArgs>(args?: SelectSubset<T, DeviceTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceTokens
     * const deviceToken = await prisma.deviceToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceTokenUpdateManyArgs>(args: SelectSubset<T, DeviceTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceTokens and returns the data updated in the database.
     * @param {DeviceTokenUpdateManyAndReturnArgs} args - Arguments to update many DeviceTokens.
     * @example
     * // Update many DeviceTokens
     * const deviceToken = await prisma.deviceToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeviceTokens and only return the `id`
     * const deviceTokenWithIdOnly = await prisma.deviceToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends DeviceTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, DeviceTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeviceToken.
     * @param {DeviceTokenUpsertArgs} args - Arguments to update or create a DeviceToken.
     * @example
     * // Update or create a DeviceToken
     * const deviceToken = await prisma.deviceToken.upsert({
     *   create: {
     *     // ... data to create a DeviceToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceToken we want to update
     *   }
     * })
     */
    upsert<T extends DeviceTokenUpsertArgs>(args: SelectSubset<T, DeviceTokenUpsertArgs<ExtArgs>>): Prisma__DeviceTokenClient<$Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeviceTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTokenCountArgs} args - Arguments to filter DeviceTokens to count.
     * @example
     * // Count the number of DeviceTokens
     * const count = await prisma.deviceToken.count({
     *   where: {
     *     // ... the filter for the DeviceTokens we want to count
     *   }
     * })
    **/
    count<T extends DeviceTokenCountArgs>(
      args?: Subset<T, DeviceTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeviceToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeviceTokenAggregateArgs>(args: Subset<T, DeviceTokenAggregateArgs>): Prisma.PrismaPromise<GetDeviceTokenAggregateType<T>>

    /**
     * Group by DeviceToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceTokenGroupByArgs} args - Group by arguments.
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
      T extends DeviceTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceTokenGroupByArgs['orderBy'] }
        : { orderBy?: DeviceTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DeviceTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeviceToken model
   */
  readonly fields: DeviceTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeviceToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DeviceToken model
   */
  interface DeviceTokenFieldRefs {
    readonly id: FieldRef<"DeviceToken", 'Int'>
    readonly token: FieldRef<"DeviceToken", 'String'>
    readonly usuarioId: FieldRef<"DeviceToken", 'Int'>
    readonly createdAt: FieldRef<"DeviceToken", 'DateTime'>
    readonly updatedAt: FieldRef<"DeviceToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeviceToken findUnique
   */
  export type DeviceTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
    /**
     * Filter, which DeviceToken to fetch.
     */
    where: DeviceTokenWhereUniqueInput
  }

  /**
   * DeviceToken findUniqueOrThrow
   */
  export type DeviceTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
    /**
     * Filter, which DeviceToken to fetch.
     */
    where: DeviceTokenWhereUniqueInput
  }

  /**
   * DeviceToken findFirst
   */
  export type DeviceTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
    /**
     * Filter, which DeviceToken to fetch.
     */
    where?: DeviceTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTokens to fetch.
     */
    orderBy?: DeviceTokenOrderByWithRelationInput | DeviceTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceTokens.
     */
    cursor?: DeviceTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceTokens.
     */
    distinct?: DeviceTokenScalarFieldEnum | DeviceTokenScalarFieldEnum[]
  }

  /**
   * DeviceToken findFirstOrThrow
   */
  export type DeviceTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
    /**
     * Filter, which DeviceToken to fetch.
     */
    where?: DeviceTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTokens to fetch.
     */
    orderBy?: DeviceTokenOrderByWithRelationInput | DeviceTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceTokens.
     */
    cursor?: DeviceTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceTokens.
     */
    distinct?: DeviceTokenScalarFieldEnum | DeviceTokenScalarFieldEnum[]
  }

  /**
   * DeviceToken findMany
   */
  export type DeviceTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
    /**
     * Filter, which DeviceTokens to fetch.
     */
    where?: DeviceTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceTokens to fetch.
     */
    orderBy?: DeviceTokenOrderByWithRelationInput | DeviceTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeviceTokens.
     */
    cursor?: DeviceTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceTokens.
     */
    skip?: number
    distinct?: DeviceTokenScalarFieldEnum | DeviceTokenScalarFieldEnum[]
  }

  /**
   * DeviceToken create
   */
  export type DeviceTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a DeviceToken.
     */
    data: XOR<DeviceTokenCreateInput, DeviceTokenUncheckedCreateInput>
  }

  /**
   * DeviceToken createMany
   */
  export type DeviceTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeviceTokens.
     */
    data: DeviceTokenCreateManyInput | DeviceTokenCreateManyInput[]
  }

  /**
   * DeviceToken createManyAndReturn
   */
  export type DeviceTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * The data used to create many DeviceTokens.
     */
    data: DeviceTokenCreateManyInput | DeviceTokenCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DeviceToken update
   */
  export type DeviceTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a DeviceToken.
     */
    data: XOR<DeviceTokenUpdateInput, DeviceTokenUncheckedUpdateInput>
    /**
     * Choose, which DeviceToken to update.
     */
    where: DeviceTokenWhereUniqueInput
  }

  /**
   * DeviceToken updateMany
   */
  export type DeviceTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeviceTokens.
     */
    data: XOR<DeviceTokenUpdateManyMutationInput, DeviceTokenUncheckedUpdateManyInput>
    /**
     * Filter which DeviceTokens to update
     */
    where?: DeviceTokenWhereInput
    /**
     * Limit how many DeviceTokens to update.
     */
    limit?: number
  }

  /**
   * DeviceToken updateManyAndReturn
   */
  export type DeviceTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * The data used to update DeviceTokens.
     */
    data: XOR<DeviceTokenUpdateManyMutationInput, DeviceTokenUncheckedUpdateManyInput>
    /**
     * Filter which DeviceTokens to update
     */
    where?: DeviceTokenWhereInput
    /**
     * Limit how many DeviceTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DeviceToken upsert
   */
  export type DeviceTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the DeviceToken to update in case it exists.
     */
    where: DeviceTokenWhereUniqueInput
    /**
     * In case the DeviceToken found by the `where` argument doesn't exist, create a new DeviceToken with this data.
     */
    create: XOR<DeviceTokenCreateInput, DeviceTokenUncheckedCreateInput>
    /**
     * In case the DeviceToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceTokenUpdateInput, DeviceTokenUncheckedUpdateInput>
  }

  /**
   * DeviceToken delete
   */
  export type DeviceTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
    /**
     * Filter which DeviceToken to delete.
     */
    where: DeviceTokenWhereUniqueInput
  }

  /**
   * DeviceToken deleteMany
   */
  export type DeviceTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceTokens to delete
     */
    where?: DeviceTokenWhereInput
    /**
     * Limit how many DeviceTokens to delete.
     */
    limit?: number
  }

  /**
   * DeviceToken without action
   */
  export type DeviceTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceToken
     */
    select?: DeviceTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceToken
     */
    omit?: DeviceTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceTokenInclude<ExtArgs> | null
  }


  /**
   * Model UserCode
   */

  export type AggregateUserCode = {
    _count: UserCodeCountAggregateOutputType | null
    _avg: UserCodeAvgAggregateOutputType | null
    _sum: UserCodeSumAggregateOutputType | null
    _min: UserCodeMinAggregateOutputType | null
    _max: UserCodeMaxAggregateOutputType | null
  }

  export type UserCodeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserCodeSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserCodeMinAggregateOutputType = {
    id: number | null
    userId: number | null
    code: string | null
    status: string | null
    expiryTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCodeMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    code: string | null
    status: string | null
    expiryTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCodeCountAggregateOutputType = {
    id: number
    userId: number
    code: number
    status: number
    expiryTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserCodeAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserCodeSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserCodeMinAggregateInputType = {
    id?: true
    userId?: true
    code?: true
    status?: true
    expiryTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCodeMaxAggregateInputType = {
    id?: true
    userId?: true
    code?: true
    status?: true
    expiryTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCodeCountAggregateInputType = {
    id?: true
    userId?: true
    code?: true
    status?: true
    expiryTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCode to aggregate.
     */
    where?: UserCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCodes to fetch.
     */
    orderBy?: UserCodeOrderByWithRelationInput | UserCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCodes
    **/
    _count?: true | UserCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCodeMaxAggregateInputType
  }

  export type GetUserCodeAggregateType<T extends UserCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCode[P]>
      : GetScalarType<T[P], AggregateUserCode[P]>
  }




  export type UserCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCodeWhereInput
    orderBy?: UserCodeOrderByWithAggregationInput | UserCodeOrderByWithAggregationInput[]
    by: UserCodeScalarFieldEnum[] | UserCodeScalarFieldEnum
    having?: UserCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCodeCountAggregateInputType | true
    _avg?: UserCodeAvgAggregateInputType
    _sum?: UserCodeSumAggregateInputType
    _min?: UserCodeMinAggregateInputType
    _max?: UserCodeMaxAggregateInputType
  }

  export type UserCodeGroupByOutputType = {
    id: number
    userId: number
    code: string
    status: string
    expiryTime: Date
    createdAt: Date
    updatedAt: Date
    _count: UserCodeCountAggregateOutputType | null
    _avg: UserCodeAvgAggregateOutputType | null
    _sum: UserCodeSumAggregateOutputType | null
    _min: UserCodeMinAggregateOutputType | null
    _max: UserCodeMaxAggregateOutputType | null
  }

  type GetUserCodeGroupByPayload<T extends UserCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCodeGroupByOutputType[P]>
            : GetScalarType<T[P], UserCodeGroupByOutputType[P]>
        }
      >
    >


  export type UserCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    code?: boolean
    status?: boolean
    expiryTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCode"]>

  export type UserCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    code?: boolean
    status?: boolean
    expiryTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCode"]>

  export type UserCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    code?: boolean
    status?: boolean
    expiryTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCode"]>

  export type UserCodeSelectScalar = {
    id?: boolean
    userId?: boolean
    code?: boolean
    status?: boolean
    expiryTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "code" | "status" | "expiryTime" | "createdAt" | "updatedAt", ExtArgs["result"]["userCode"]>
  export type UserCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type UserCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type UserCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $UserCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCode"
    objects: {
      user: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      code: string
      status: string
      expiryTime: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userCode"]>
    composites: {}
  }

  type UserCodeGetPayload<S extends boolean | null | undefined | UserCodeDefaultArgs> = $Result.GetResult<Prisma.$UserCodePayload, S>

  type UserCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCodeCountAggregateInputType | true
    }

  export interface UserCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCode'], meta: { name: 'UserCode' } }
    /**
     * Find zero or one UserCode that matches the filter.
     * @param {UserCodeFindUniqueArgs} args - Arguments to find a UserCode
     * @example
     * // Get one UserCode
     * const userCode = await prisma.userCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCodeFindUniqueArgs>(args: SelectSubset<T, UserCodeFindUniqueArgs<ExtArgs>>): Prisma__UserCodeClient<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCodeFindUniqueOrThrowArgs} args - Arguments to find a UserCode
     * @example
     * // Get one UserCode
     * const userCode = await prisma.userCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, UserCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserCodeClient<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCodeFindFirstArgs} args - Arguments to find a UserCode
     * @example
     * // Get one UserCode
     * const userCode = await prisma.userCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCodeFindFirstArgs>(args?: SelectSubset<T, UserCodeFindFirstArgs<ExtArgs>>): Prisma__UserCodeClient<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCodeFindFirstOrThrowArgs} args - Arguments to find a UserCode
     * @example
     * // Get one UserCode
     * const userCode = await prisma.userCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, UserCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserCodeClient<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCodes
     * const userCodes = await prisma.userCode.findMany()
     * 
     * // Get first 10 UserCodes
     * const userCodes = await prisma.userCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userCodeWithIdOnly = await prisma.userCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserCodeFindManyArgs>(args?: SelectSubset<T, UserCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserCode.
     * @param {UserCodeCreateArgs} args - Arguments to create a UserCode.
     * @example
     * // Create one UserCode
     * const UserCode = await prisma.userCode.create({
     *   data: {
     *     // ... data to create a UserCode
     *   }
     * })
     * 
     */
    create<T extends UserCodeCreateArgs>(args: SelectSubset<T, UserCodeCreateArgs<ExtArgs>>): Prisma__UserCodeClient<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserCodes.
     * @param {UserCodeCreateManyArgs} args - Arguments to create many UserCodes.
     * @example
     * // Create many UserCodes
     * const userCode = await prisma.userCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCodeCreateManyArgs>(args?: SelectSubset<T, UserCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserCodes and returns the data saved in the database.
     * @param {UserCodeCreateManyAndReturnArgs} args - Arguments to create many UserCodes.
     * @example
     * // Create many UserCodes
     * const userCode = await prisma.userCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserCodes and only return the `id`
     * const userCodeWithIdOnly = await prisma.userCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserCode.
     * @param {UserCodeDeleteArgs} args - Arguments to delete one UserCode.
     * @example
     * // Delete one UserCode
     * const UserCode = await prisma.userCode.delete({
     *   where: {
     *     // ... filter to delete one UserCode
     *   }
     * })
     * 
     */
    delete<T extends UserCodeDeleteArgs>(args: SelectSubset<T, UserCodeDeleteArgs<ExtArgs>>): Prisma__UserCodeClient<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserCode.
     * @param {UserCodeUpdateArgs} args - Arguments to update one UserCode.
     * @example
     * // Update one UserCode
     * const userCode = await prisma.userCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserCodeUpdateArgs>(args: SelectSubset<T, UserCodeUpdateArgs<ExtArgs>>): Prisma__UserCodeClient<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserCodes.
     * @param {UserCodeDeleteManyArgs} args - Arguments to filter UserCodes to delete.
     * @example
     * // Delete a few UserCodes
     * const { count } = await prisma.userCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserCodeDeleteManyArgs>(args?: SelectSubset<T, UserCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCodes
     * const userCode = await prisma.userCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserCodeUpdateManyArgs>(args: SelectSubset<T, UserCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCodes and returns the data updated in the database.
     * @param {UserCodeUpdateManyAndReturnArgs} args - Arguments to update many UserCodes.
     * @example
     * // Update many UserCodes
     * const userCode = await prisma.userCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserCodes and only return the `id`
     * const userCodeWithIdOnly = await prisma.userCode.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, UserCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserCode.
     * @param {UserCodeUpsertArgs} args - Arguments to update or create a UserCode.
     * @example
     * // Update or create a UserCode
     * const userCode = await prisma.userCode.upsert({
     *   create: {
     *     // ... data to create a UserCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCode we want to update
     *   }
     * })
     */
    upsert<T extends UserCodeUpsertArgs>(args: SelectSubset<T, UserCodeUpsertArgs<ExtArgs>>): Prisma__UserCodeClient<$Result.GetResult<Prisma.$UserCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCodeCountArgs} args - Arguments to filter UserCodes to count.
     * @example
     * // Count the number of UserCodes
     * const count = await prisma.userCode.count({
     *   where: {
     *     // ... the filter for the UserCodes we want to count
     *   }
     * })
    **/
    count<T extends UserCodeCountArgs>(
      args?: Subset<T, UserCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserCodeAggregateArgs>(args: Subset<T, UserCodeAggregateArgs>): Prisma.PrismaPromise<GetUserCodeAggregateType<T>>

    /**
     * Group by UserCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCodeGroupByArgs} args - Group by arguments.
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
      T extends UserCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCodeGroupByArgs['orderBy'] }
        : { orderBy?: UserCodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCode model
   */
  readonly fields: UserCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserCode model
   */
  interface UserCodeFieldRefs {
    readonly id: FieldRef<"UserCode", 'Int'>
    readonly userId: FieldRef<"UserCode", 'Int'>
    readonly code: FieldRef<"UserCode", 'String'>
    readonly status: FieldRef<"UserCode", 'String'>
    readonly expiryTime: FieldRef<"UserCode", 'DateTime'>
    readonly createdAt: FieldRef<"UserCode", 'DateTime'>
    readonly updatedAt: FieldRef<"UserCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserCode findUnique
   */
  export type UserCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
    /**
     * Filter, which UserCode to fetch.
     */
    where: UserCodeWhereUniqueInput
  }

  /**
   * UserCode findUniqueOrThrow
   */
  export type UserCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
    /**
     * Filter, which UserCode to fetch.
     */
    where: UserCodeWhereUniqueInput
  }

  /**
   * UserCode findFirst
   */
  export type UserCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
    /**
     * Filter, which UserCode to fetch.
     */
    where?: UserCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCodes to fetch.
     */
    orderBy?: UserCodeOrderByWithRelationInput | UserCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCodes.
     */
    cursor?: UserCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCodes.
     */
    distinct?: UserCodeScalarFieldEnum | UserCodeScalarFieldEnum[]
  }

  /**
   * UserCode findFirstOrThrow
   */
  export type UserCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
    /**
     * Filter, which UserCode to fetch.
     */
    where?: UserCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCodes to fetch.
     */
    orderBy?: UserCodeOrderByWithRelationInput | UserCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCodes.
     */
    cursor?: UserCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCodes.
     */
    distinct?: UserCodeScalarFieldEnum | UserCodeScalarFieldEnum[]
  }

  /**
   * UserCode findMany
   */
  export type UserCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
    /**
     * Filter, which UserCodes to fetch.
     */
    where?: UserCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCodes to fetch.
     */
    orderBy?: UserCodeOrderByWithRelationInput | UserCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCodes.
     */
    cursor?: UserCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCodes.
     */
    skip?: number
    distinct?: UserCodeScalarFieldEnum | UserCodeScalarFieldEnum[]
  }

  /**
   * UserCode create
   */
  export type UserCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a UserCode.
     */
    data: XOR<UserCodeCreateInput, UserCodeUncheckedCreateInput>
  }

  /**
   * UserCode createMany
   */
  export type UserCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCodes.
     */
    data: UserCodeCreateManyInput | UserCodeCreateManyInput[]
  }

  /**
   * UserCode createManyAndReturn
   */
  export type UserCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * The data used to create many UserCodes.
     */
    data: UserCodeCreateManyInput | UserCodeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCode update
   */
  export type UserCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a UserCode.
     */
    data: XOR<UserCodeUpdateInput, UserCodeUncheckedUpdateInput>
    /**
     * Choose, which UserCode to update.
     */
    where: UserCodeWhereUniqueInput
  }

  /**
   * UserCode updateMany
   */
  export type UserCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCodes.
     */
    data: XOR<UserCodeUpdateManyMutationInput, UserCodeUncheckedUpdateManyInput>
    /**
     * Filter which UserCodes to update
     */
    where?: UserCodeWhereInput
    /**
     * Limit how many UserCodes to update.
     */
    limit?: number
  }

  /**
   * UserCode updateManyAndReturn
   */
  export type UserCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * The data used to update UserCodes.
     */
    data: XOR<UserCodeUpdateManyMutationInput, UserCodeUncheckedUpdateManyInput>
    /**
     * Filter which UserCodes to update
     */
    where?: UserCodeWhereInput
    /**
     * Limit how many UserCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCode upsert
   */
  export type UserCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the UserCode to update in case it exists.
     */
    where: UserCodeWhereUniqueInput
    /**
     * In case the UserCode found by the `where` argument doesn't exist, create a new UserCode with this data.
     */
    create: XOR<UserCodeCreateInput, UserCodeUncheckedCreateInput>
    /**
     * In case the UserCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCodeUpdateInput, UserCodeUncheckedUpdateInput>
  }

  /**
   * UserCode delete
   */
  export type UserCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
    /**
     * Filter which UserCode to delete.
     */
    where: UserCodeWhereUniqueInput
  }

  /**
   * UserCode deleteMany
   */
  export type UserCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCodes to delete
     */
    where?: UserCodeWhereInput
    /**
     * Limit how many UserCodes to delete.
     */
    limit?: number
  }

  /**
   * UserCode without action
   */
  export type UserCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCode
     */
    select?: UserCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCode
     */
    omit?: UserCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCodeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    apellido: 'apellido',
    email: 'email',
    password: 'password',
    rol: 'rol',
    verificado: 'verificado',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const CarreraScalarFieldEnum: {
    id: 'id',
    apiId: 'apiId',
    nombre: 'nombre'
  };

  export type CarreraScalarFieldEnum = (typeof CarreraScalarFieldEnum)[keyof typeof CarreraScalarFieldEnum]


  export const PreferenciaUsuarioCarreraScalarFieldEnum: {
    usuarioId: 'usuarioId',
    carreraId: 'carreraId',
    createdAt: 'createdAt'
  };

  export type PreferenciaUsuarioCarreraScalarFieldEnum = (typeof PreferenciaUsuarioCarreraScalarFieldEnum)[keyof typeof PreferenciaUsuarioCarreraScalarFieldEnum]


  export const DeviceTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    usuarioId: 'usuarioId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeviceTokenScalarFieldEnum = (typeof DeviceTokenScalarFieldEnum)[keyof typeof DeviceTokenScalarFieldEnum]


  export const UserCodeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    code: 'code',
    status: 'status',
    expiryTime: 'expiryTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserCodeScalarFieldEnum = (typeof UserCodeScalarFieldEnum)[keyof typeof UserCodeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nombre?: StringFilter<"Usuario"> | string
    apellido?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: StringNullableFilter<"Usuario"> | string | null
    verificado?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    deviceTokens?: DeviceTokenListRelationFilter
    preferencias?: PreferenciaUsuarioCarreraListRelationFilter
    userCodes?: UserCodeListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrderInput | SortOrder
    verificado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deviceTokens?: DeviceTokenOrderByRelationAggregateInput
    preferencias?: PreferenciaUsuarioCarreraOrderByRelationAggregateInput
    userCodes?: UserCodeOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    apellido?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: StringNullableFilter<"Usuario"> | string | null
    verificado?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    deviceTokens?: DeviceTokenListRelationFilter
    preferencias?: PreferenciaUsuarioCarreraListRelationFilter
    userCodes?: UserCodeListRelationFilter
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrderInput | SortOrder
    verificado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    apellido?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    password?: StringWithAggregatesFilter<"Usuario"> | string
    rol?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    verificado?: BoolWithAggregatesFilter<"Usuario"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type CarreraWhereInput = {
    AND?: CarreraWhereInput | CarreraWhereInput[]
    OR?: CarreraWhereInput[]
    NOT?: CarreraWhereInput | CarreraWhereInput[]
    id?: IntFilter<"Carrera"> | number
    apiId?: StringFilter<"Carrera"> | string
    nombre?: StringFilter<"Carrera"> | string
    usuariosConPreferencia?: PreferenciaUsuarioCarreraListRelationFilter
  }

  export type CarreraOrderByWithRelationInput = {
    id?: SortOrder
    apiId?: SortOrder
    nombre?: SortOrder
    usuariosConPreferencia?: PreferenciaUsuarioCarreraOrderByRelationAggregateInput
  }

  export type CarreraWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    apiId?: string
    AND?: CarreraWhereInput | CarreraWhereInput[]
    OR?: CarreraWhereInput[]
    NOT?: CarreraWhereInput | CarreraWhereInput[]
    nombre?: StringFilter<"Carrera"> | string
    usuariosConPreferencia?: PreferenciaUsuarioCarreraListRelationFilter
  }, "id" | "apiId">

  export type CarreraOrderByWithAggregationInput = {
    id?: SortOrder
    apiId?: SortOrder
    nombre?: SortOrder
    _count?: CarreraCountOrderByAggregateInput
    _avg?: CarreraAvgOrderByAggregateInput
    _max?: CarreraMaxOrderByAggregateInput
    _min?: CarreraMinOrderByAggregateInput
    _sum?: CarreraSumOrderByAggregateInput
  }

  export type CarreraScalarWhereWithAggregatesInput = {
    AND?: CarreraScalarWhereWithAggregatesInput | CarreraScalarWhereWithAggregatesInput[]
    OR?: CarreraScalarWhereWithAggregatesInput[]
    NOT?: CarreraScalarWhereWithAggregatesInput | CarreraScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Carrera"> | number
    apiId?: StringWithAggregatesFilter<"Carrera"> | string
    nombre?: StringWithAggregatesFilter<"Carrera"> | string
  }

  export type PreferenciaUsuarioCarreraWhereInput = {
    AND?: PreferenciaUsuarioCarreraWhereInput | PreferenciaUsuarioCarreraWhereInput[]
    OR?: PreferenciaUsuarioCarreraWhereInput[]
    NOT?: PreferenciaUsuarioCarreraWhereInput | PreferenciaUsuarioCarreraWhereInput[]
    usuarioId?: IntFilter<"PreferenciaUsuarioCarrera"> | number
    carreraId?: IntFilter<"PreferenciaUsuarioCarrera"> | number
    createdAt?: DateTimeFilter<"PreferenciaUsuarioCarrera"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    carrera?: XOR<CarreraScalarRelationFilter, CarreraWhereInput>
  }

  export type PreferenciaUsuarioCarreraOrderByWithRelationInput = {
    usuarioId?: SortOrder
    carreraId?: SortOrder
    createdAt?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    carrera?: CarreraOrderByWithRelationInput
  }

  export type PreferenciaUsuarioCarreraWhereUniqueInput = Prisma.AtLeast<{
    usuarioId_carreraId?: PreferenciaUsuarioCarreraUsuarioIdCarreraIdCompoundUniqueInput
    AND?: PreferenciaUsuarioCarreraWhereInput | PreferenciaUsuarioCarreraWhereInput[]
    OR?: PreferenciaUsuarioCarreraWhereInput[]
    NOT?: PreferenciaUsuarioCarreraWhereInput | PreferenciaUsuarioCarreraWhereInput[]
    usuarioId?: IntFilter<"PreferenciaUsuarioCarrera"> | number
    carreraId?: IntFilter<"PreferenciaUsuarioCarrera"> | number
    createdAt?: DateTimeFilter<"PreferenciaUsuarioCarrera"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    carrera?: XOR<CarreraScalarRelationFilter, CarreraWhereInput>
  }, "usuarioId_carreraId">

  export type PreferenciaUsuarioCarreraOrderByWithAggregationInput = {
    usuarioId?: SortOrder
    carreraId?: SortOrder
    createdAt?: SortOrder
    _count?: PreferenciaUsuarioCarreraCountOrderByAggregateInput
    _avg?: PreferenciaUsuarioCarreraAvgOrderByAggregateInput
    _max?: PreferenciaUsuarioCarreraMaxOrderByAggregateInput
    _min?: PreferenciaUsuarioCarreraMinOrderByAggregateInput
    _sum?: PreferenciaUsuarioCarreraSumOrderByAggregateInput
  }

  export type PreferenciaUsuarioCarreraScalarWhereWithAggregatesInput = {
    AND?: PreferenciaUsuarioCarreraScalarWhereWithAggregatesInput | PreferenciaUsuarioCarreraScalarWhereWithAggregatesInput[]
    OR?: PreferenciaUsuarioCarreraScalarWhereWithAggregatesInput[]
    NOT?: PreferenciaUsuarioCarreraScalarWhereWithAggregatesInput | PreferenciaUsuarioCarreraScalarWhereWithAggregatesInput[]
    usuarioId?: IntWithAggregatesFilter<"PreferenciaUsuarioCarrera"> | number
    carreraId?: IntWithAggregatesFilter<"PreferenciaUsuarioCarrera"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PreferenciaUsuarioCarrera"> | Date | string
  }

  export type DeviceTokenWhereInput = {
    AND?: DeviceTokenWhereInput | DeviceTokenWhereInput[]
    OR?: DeviceTokenWhereInput[]
    NOT?: DeviceTokenWhereInput | DeviceTokenWhereInput[]
    id?: IntFilter<"DeviceToken"> | number
    token?: StringFilter<"DeviceToken"> | string
    usuarioId?: IntFilter<"DeviceToken"> | number
    createdAt?: DateTimeFilter<"DeviceToken"> | Date | string
    updatedAt?: DateTimeFilter<"DeviceToken"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type DeviceTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    usuarioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type DeviceTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    token?: string
    AND?: DeviceTokenWhereInput | DeviceTokenWhereInput[]
    OR?: DeviceTokenWhereInput[]
    NOT?: DeviceTokenWhereInput | DeviceTokenWhereInput[]
    usuarioId?: IntFilter<"DeviceToken"> | number
    createdAt?: DateTimeFilter<"DeviceToken"> | Date | string
    updatedAt?: DateTimeFilter<"DeviceToken"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id" | "token">

  export type DeviceTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    usuarioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeviceTokenCountOrderByAggregateInput
    _avg?: DeviceTokenAvgOrderByAggregateInput
    _max?: DeviceTokenMaxOrderByAggregateInput
    _min?: DeviceTokenMinOrderByAggregateInput
    _sum?: DeviceTokenSumOrderByAggregateInput
  }

  export type DeviceTokenScalarWhereWithAggregatesInput = {
    AND?: DeviceTokenScalarWhereWithAggregatesInput | DeviceTokenScalarWhereWithAggregatesInput[]
    OR?: DeviceTokenScalarWhereWithAggregatesInput[]
    NOT?: DeviceTokenScalarWhereWithAggregatesInput | DeviceTokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DeviceToken"> | number
    token?: StringWithAggregatesFilter<"DeviceToken"> | string
    usuarioId?: IntWithAggregatesFilter<"DeviceToken"> | number
    createdAt?: DateTimeWithAggregatesFilter<"DeviceToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DeviceToken"> | Date | string
  }

  export type UserCodeWhereInput = {
    AND?: UserCodeWhereInput | UserCodeWhereInput[]
    OR?: UserCodeWhereInput[]
    NOT?: UserCodeWhereInput | UserCodeWhereInput[]
    id?: IntFilter<"UserCode"> | number
    userId?: IntFilter<"UserCode"> | number
    code?: StringFilter<"UserCode"> | string
    status?: StringFilter<"UserCode"> | string
    expiryTime?: DateTimeFilter<"UserCode"> | Date | string
    createdAt?: DateTimeFilter<"UserCode"> | Date | string
    updatedAt?: DateTimeFilter<"UserCode"> | Date | string
    user?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type UserCodeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    status?: SortOrder
    expiryTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UsuarioOrderByWithRelationInput
  }

  export type UserCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserCodeWhereInput | UserCodeWhereInput[]
    OR?: UserCodeWhereInput[]
    NOT?: UserCodeWhereInput | UserCodeWhereInput[]
    userId?: IntFilter<"UserCode"> | number
    code?: StringFilter<"UserCode"> | string
    status?: StringFilter<"UserCode"> | string
    expiryTime?: DateTimeFilter<"UserCode"> | Date | string
    createdAt?: DateTimeFilter<"UserCode"> | Date | string
    updatedAt?: DateTimeFilter<"UserCode"> | Date | string
    user?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type UserCodeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    status?: SortOrder
    expiryTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCodeCountOrderByAggregateInput
    _avg?: UserCodeAvgOrderByAggregateInput
    _max?: UserCodeMaxOrderByAggregateInput
    _min?: UserCodeMinOrderByAggregateInput
    _sum?: UserCodeSumOrderByAggregateInput
  }

  export type UserCodeScalarWhereWithAggregatesInput = {
    AND?: UserCodeScalarWhereWithAggregatesInput | UserCodeScalarWhereWithAggregatesInput[]
    OR?: UserCodeScalarWhereWithAggregatesInput[]
    NOT?: UserCodeScalarWhereWithAggregatesInput | UserCodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserCode"> | number
    userId?: IntWithAggregatesFilter<"UserCode"> | number
    code?: StringWithAggregatesFilter<"UserCode"> | string
    status?: StringWithAggregatesFilter<"UserCode"> | string
    expiryTime?: DateTimeWithAggregatesFilter<"UserCode"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"UserCode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserCode"> | Date | string
  }

  export type UsuarioCreateInput = {
    nombre: string
    apellido: string
    email: string
    password: string
    rol?: string | null
    verificado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deviceTokens?: DeviceTokenCreateNestedManyWithoutUsuarioInput
    preferencias?: PreferenciaUsuarioCarreraCreateNestedManyWithoutUsuarioInput
    userCodes?: UserCodeCreateNestedManyWithoutUserInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    nombre: string
    apellido: string
    email: string
    password: string
    rol?: string | null
    verificado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deviceTokens?: DeviceTokenUncheckedCreateNestedManyWithoutUsuarioInput
    preferencias?: PreferenciaUsuarioCarreraUncheckedCreateNestedManyWithoutUsuarioInput
    userCodes?: UserCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsuarioUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    verificado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deviceTokens?: DeviceTokenUpdateManyWithoutUsuarioNestedInput
    preferencias?: PreferenciaUsuarioCarreraUpdateManyWithoutUsuarioNestedInput
    userCodes?: UserCodeUpdateManyWithoutUserNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    verificado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deviceTokens?: DeviceTokenUncheckedUpdateManyWithoutUsuarioNestedInput
    preferencias?: PreferenciaUsuarioCarreraUncheckedUpdateManyWithoutUsuarioNestedInput
    userCodes?: UserCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: number
    nombre: string
    apellido: string
    email: string
    password: string
    rol?: string | null
    verificado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    verificado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    verificado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarreraCreateInput = {
    apiId: string
    nombre: string
    usuariosConPreferencia?: PreferenciaUsuarioCarreraCreateNestedManyWithoutCarreraInput
  }

  export type CarreraUncheckedCreateInput = {
    id?: number
    apiId: string
    nombre: string
    usuariosConPreferencia?: PreferenciaUsuarioCarreraUncheckedCreateNestedManyWithoutCarreraInput
  }

  export type CarreraUpdateInput = {
    apiId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    usuariosConPreferencia?: PreferenciaUsuarioCarreraUpdateManyWithoutCarreraNestedInput
  }

  export type CarreraUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    apiId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    usuariosConPreferencia?: PreferenciaUsuarioCarreraUncheckedUpdateManyWithoutCarreraNestedInput
  }

  export type CarreraCreateManyInput = {
    id?: number
    apiId: string
    nombre: string
  }

  export type CarreraUpdateManyMutationInput = {
    apiId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type CarreraUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    apiId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type PreferenciaUsuarioCarreraCreateInput = {
    createdAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutPreferenciasInput
    carrera: CarreraCreateNestedOneWithoutUsuariosConPreferenciaInput
  }

  export type PreferenciaUsuarioCarreraUncheckedCreateInput = {
    usuarioId: number
    carreraId: number
    createdAt?: Date | string
  }

  export type PreferenciaUsuarioCarreraUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutPreferenciasNestedInput
    carrera?: CarreraUpdateOneRequiredWithoutUsuariosConPreferenciaNestedInput
  }

  export type PreferenciaUsuarioCarreraUncheckedUpdateInput = {
    usuarioId?: IntFieldUpdateOperationsInput | number
    carreraId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenciaUsuarioCarreraCreateManyInput = {
    usuarioId: number
    carreraId: number
    createdAt?: Date | string
  }

  export type PreferenciaUsuarioCarreraUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenciaUsuarioCarreraUncheckedUpdateManyInput = {
    usuarioId?: IntFieldUpdateOperationsInput | number
    carreraId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceTokenCreateInput = {
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutDeviceTokensInput
  }

  export type DeviceTokenUncheckedCreateInput = {
    id?: number
    token: string
    usuarioId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceTokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutDeviceTokensNestedInput
  }

  export type DeviceTokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceTokenCreateManyInput = {
    id?: number
    token: string
    usuarioId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceTokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceTokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCodeCreateInput = {
    code: string
    status?: string
    expiryTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UsuarioCreateNestedOneWithoutUserCodesInput
  }

  export type UserCodeUncheckedCreateInput = {
    id?: number
    userId: number
    code: string
    status?: string
    expiryTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCodeUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsuarioUpdateOneRequiredWithoutUserCodesNestedInput
  }

  export type UserCodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCodeCreateManyInput = {
    id?: number
    userId: number
    code: string
    status?: string
    expiryTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCodeUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DeviceTokenListRelationFilter = {
    every?: DeviceTokenWhereInput
    some?: DeviceTokenWhereInput
    none?: DeviceTokenWhereInput
  }

  export type PreferenciaUsuarioCarreraListRelationFilter = {
    every?: PreferenciaUsuarioCarreraWhereInput
    some?: PreferenciaUsuarioCarreraWhereInput
    none?: PreferenciaUsuarioCarreraWhereInput
  }

  export type UserCodeListRelationFilter = {
    every?: UserCodeWhereInput
    some?: UserCodeWhereInput
    none?: UserCodeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DeviceTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PreferenciaUsuarioCarreraOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    verificado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    verificado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    verificado?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CarreraCountOrderByAggregateInput = {
    id?: SortOrder
    apiId?: SortOrder
    nombre?: SortOrder
  }

  export type CarreraAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CarreraMaxOrderByAggregateInput = {
    id?: SortOrder
    apiId?: SortOrder
    nombre?: SortOrder
  }

  export type CarreraMinOrderByAggregateInput = {
    id?: SortOrder
    apiId?: SortOrder
    nombre?: SortOrder
  }

  export type CarreraSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type CarreraScalarRelationFilter = {
    is?: CarreraWhereInput
    isNot?: CarreraWhereInput
  }

  export type PreferenciaUsuarioCarreraUsuarioIdCarreraIdCompoundUniqueInput = {
    usuarioId: number
    carreraId: number
  }

  export type PreferenciaUsuarioCarreraCountOrderByAggregateInput = {
    usuarioId?: SortOrder
    carreraId?: SortOrder
    createdAt?: SortOrder
  }

  export type PreferenciaUsuarioCarreraAvgOrderByAggregateInput = {
    usuarioId?: SortOrder
    carreraId?: SortOrder
  }

  export type PreferenciaUsuarioCarreraMaxOrderByAggregateInput = {
    usuarioId?: SortOrder
    carreraId?: SortOrder
    createdAt?: SortOrder
  }

  export type PreferenciaUsuarioCarreraMinOrderByAggregateInput = {
    usuarioId?: SortOrder
    carreraId?: SortOrder
    createdAt?: SortOrder
  }

  export type PreferenciaUsuarioCarreraSumOrderByAggregateInput = {
    usuarioId?: SortOrder
    carreraId?: SortOrder
  }

  export type DeviceTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    usuarioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceTokenAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
  }

  export type DeviceTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    usuarioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    usuarioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceTokenSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
  }

  export type UserCodeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    status?: SortOrder
    expiryTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCodeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    status?: SortOrder
    expiryTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCodeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    status?: SortOrder
    expiryTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCodeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type DeviceTokenCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<DeviceTokenCreateWithoutUsuarioInput, DeviceTokenUncheckedCreateWithoutUsuarioInput> | DeviceTokenCreateWithoutUsuarioInput[] | DeviceTokenUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: DeviceTokenCreateOrConnectWithoutUsuarioInput | DeviceTokenCreateOrConnectWithoutUsuarioInput[]
    createMany?: DeviceTokenCreateManyUsuarioInputEnvelope
    connect?: DeviceTokenWhereUniqueInput | DeviceTokenWhereUniqueInput[]
  }

  export type PreferenciaUsuarioCarreraCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PreferenciaUsuarioCarreraCreateWithoutUsuarioInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput> | PreferenciaUsuarioCarreraCreateWithoutUsuarioInput[] | PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PreferenciaUsuarioCarreraCreateOrConnectWithoutUsuarioInput | PreferenciaUsuarioCarreraCreateOrConnectWithoutUsuarioInput[]
    createMany?: PreferenciaUsuarioCarreraCreateManyUsuarioInputEnvelope
    connect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
  }

  export type UserCodeCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCodeCreateWithoutUserInput, UserCodeUncheckedCreateWithoutUserInput> | UserCodeCreateWithoutUserInput[] | UserCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCodeCreateOrConnectWithoutUserInput | UserCodeCreateOrConnectWithoutUserInput[]
    createMany?: UserCodeCreateManyUserInputEnvelope
    connect?: UserCodeWhereUniqueInput | UserCodeWhereUniqueInput[]
  }

  export type DeviceTokenUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<DeviceTokenCreateWithoutUsuarioInput, DeviceTokenUncheckedCreateWithoutUsuarioInput> | DeviceTokenCreateWithoutUsuarioInput[] | DeviceTokenUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: DeviceTokenCreateOrConnectWithoutUsuarioInput | DeviceTokenCreateOrConnectWithoutUsuarioInput[]
    createMany?: DeviceTokenCreateManyUsuarioInputEnvelope
    connect?: DeviceTokenWhereUniqueInput | DeviceTokenWhereUniqueInput[]
  }

  export type PreferenciaUsuarioCarreraUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PreferenciaUsuarioCarreraCreateWithoutUsuarioInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput> | PreferenciaUsuarioCarreraCreateWithoutUsuarioInput[] | PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PreferenciaUsuarioCarreraCreateOrConnectWithoutUsuarioInput | PreferenciaUsuarioCarreraCreateOrConnectWithoutUsuarioInput[]
    createMany?: PreferenciaUsuarioCarreraCreateManyUsuarioInputEnvelope
    connect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
  }

  export type UserCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCodeCreateWithoutUserInput, UserCodeUncheckedCreateWithoutUserInput> | UserCodeCreateWithoutUserInput[] | UserCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCodeCreateOrConnectWithoutUserInput | UserCodeCreateOrConnectWithoutUserInput[]
    createMany?: UserCodeCreateManyUserInputEnvelope
    connect?: UserCodeWhereUniqueInput | UserCodeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DeviceTokenUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<DeviceTokenCreateWithoutUsuarioInput, DeviceTokenUncheckedCreateWithoutUsuarioInput> | DeviceTokenCreateWithoutUsuarioInput[] | DeviceTokenUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: DeviceTokenCreateOrConnectWithoutUsuarioInput | DeviceTokenCreateOrConnectWithoutUsuarioInput[]
    upsert?: DeviceTokenUpsertWithWhereUniqueWithoutUsuarioInput | DeviceTokenUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: DeviceTokenCreateManyUsuarioInputEnvelope
    set?: DeviceTokenWhereUniqueInput | DeviceTokenWhereUniqueInput[]
    disconnect?: DeviceTokenWhereUniqueInput | DeviceTokenWhereUniqueInput[]
    delete?: DeviceTokenWhereUniqueInput | DeviceTokenWhereUniqueInput[]
    connect?: DeviceTokenWhereUniqueInput | DeviceTokenWhereUniqueInput[]
    update?: DeviceTokenUpdateWithWhereUniqueWithoutUsuarioInput | DeviceTokenUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: DeviceTokenUpdateManyWithWhereWithoutUsuarioInput | DeviceTokenUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: DeviceTokenScalarWhereInput | DeviceTokenScalarWhereInput[]
  }

  export type PreferenciaUsuarioCarreraUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PreferenciaUsuarioCarreraCreateWithoutUsuarioInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput> | PreferenciaUsuarioCarreraCreateWithoutUsuarioInput[] | PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PreferenciaUsuarioCarreraCreateOrConnectWithoutUsuarioInput | PreferenciaUsuarioCarreraCreateOrConnectWithoutUsuarioInput[]
    upsert?: PreferenciaUsuarioCarreraUpsertWithWhereUniqueWithoutUsuarioInput | PreferenciaUsuarioCarreraUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PreferenciaUsuarioCarreraCreateManyUsuarioInputEnvelope
    set?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    disconnect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    delete?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    connect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    update?: PreferenciaUsuarioCarreraUpdateWithWhereUniqueWithoutUsuarioInput | PreferenciaUsuarioCarreraUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PreferenciaUsuarioCarreraUpdateManyWithWhereWithoutUsuarioInput | PreferenciaUsuarioCarreraUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PreferenciaUsuarioCarreraScalarWhereInput | PreferenciaUsuarioCarreraScalarWhereInput[]
  }

  export type UserCodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCodeCreateWithoutUserInput, UserCodeUncheckedCreateWithoutUserInput> | UserCodeCreateWithoutUserInput[] | UserCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCodeCreateOrConnectWithoutUserInput | UserCodeCreateOrConnectWithoutUserInput[]
    upsert?: UserCodeUpsertWithWhereUniqueWithoutUserInput | UserCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCodeCreateManyUserInputEnvelope
    set?: UserCodeWhereUniqueInput | UserCodeWhereUniqueInput[]
    disconnect?: UserCodeWhereUniqueInput | UserCodeWhereUniqueInput[]
    delete?: UserCodeWhereUniqueInput | UserCodeWhereUniqueInput[]
    connect?: UserCodeWhereUniqueInput | UserCodeWhereUniqueInput[]
    update?: UserCodeUpdateWithWhereUniqueWithoutUserInput | UserCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCodeUpdateManyWithWhereWithoutUserInput | UserCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCodeScalarWhereInput | UserCodeScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DeviceTokenUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<DeviceTokenCreateWithoutUsuarioInput, DeviceTokenUncheckedCreateWithoutUsuarioInput> | DeviceTokenCreateWithoutUsuarioInput[] | DeviceTokenUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: DeviceTokenCreateOrConnectWithoutUsuarioInput | DeviceTokenCreateOrConnectWithoutUsuarioInput[]
    upsert?: DeviceTokenUpsertWithWhereUniqueWithoutUsuarioInput | DeviceTokenUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: DeviceTokenCreateManyUsuarioInputEnvelope
    set?: DeviceTokenWhereUniqueInput | DeviceTokenWhereUniqueInput[]
    disconnect?: DeviceTokenWhereUniqueInput | DeviceTokenWhereUniqueInput[]
    delete?: DeviceTokenWhereUniqueInput | DeviceTokenWhereUniqueInput[]
    connect?: DeviceTokenWhereUniqueInput | DeviceTokenWhereUniqueInput[]
    update?: DeviceTokenUpdateWithWhereUniqueWithoutUsuarioInput | DeviceTokenUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: DeviceTokenUpdateManyWithWhereWithoutUsuarioInput | DeviceTokenUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: DeviceTokenScalarWhereInput | DeviceTokenScalarWhereInput[]
  }

  export type PreferenciaUsuarioCarreraUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PreferenciaUsuarioCarreraCreateWithoutUsuarioInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput> | PreferenciaUsuarioCarreraCreateWithoutUsuarioInput[] | PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PreferenciaUsuarioCarreraCreateOrConnectWithoutUsuarioInput | PreferenciaUsuarioCarreraCreateOrConnectWithoutUsuarioInput[]
    upsert?: PreferenciaUsuarioCarreraUpsertWithWhereUniqueWithoutUsuarioInput | PreferenciaUsuarioCarreraUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PreferenciaUsuarioCarreraCreateManyUsuarioInputEnvelope
    set?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    disconnect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    delete?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    connect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    update?: PreferenciaUsuarioCarreraUpdateWithWhereUniqueWithoutUsuarioInput | PreferenciaUsuarioCarreraUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PreferenciaUsuarioCarreraUpdateManyWithWhereWithoutUsuarioInput | PreferenciaUsuarioCarreraUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PreferenciaUsuarioCarreraScalarWhereInput | PreferenciaUsuarioCarreraScalarWhereInput[]
  }

  export type UserCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCodeCreateWithoutUserInput, UserCodeUncheckedCreateWithoutUserInput> | UserCodeCreateWithoutUserInput[] | UserCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCodeCreateOrConnectWithoutUserInput | UserCodeCreateOrConnectWithoutUserInput[]
    upsert?: UserCodeUpsertWithWhereUniqueWithoutUserInput | UserCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCodeCreateManyUserInputEnvelope
    set?: UserCodeWhereUniqueInput | UserCodeWhereUniqueInput[]
    disconnect?: UserCodeWhereUniqueInput | UserCodeWhereUniqueInput[]
    delete?: UserCodeWhereUniqueInput | UserCodeWhereUniqueInput[]
    connect?: UserCodeWhereUniqueInput | UserCodeWhereUniqueInput[]
    update?: UserCodeUpdateWithWhereUniqueWithoutUserInput | UserCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCodeUpdateManyWithWhereWithoutUserInput | UserCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCodeScalarWhereInput | UserCodeScalarWhereInput[]
  }

  export type PreferenciaUsuarioCarreraCreateNestedManyWithoutCarreraInput = {
    create?: XOR<PreferenciaUsuarioCarreraCreateWithoutCarreraInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput> | PreferenciaUsuarioCarreraCreateWithoutCarreraInput[] | PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput[]
    connectOrCreate?: PreferenciaUsuarioCarreraCreateOrConnectWithoutCarreraInput | PreferenciaUsuarioCarreraCreateOrConnectWithoutCarreraInput[]
    createMany?: PreferenciaUsuarioCarreraCreateManyCarreraInputEnvelope
    connect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
  }

  export type PreferenciaUsuarioCarreraUncheckedCreateNestedManyWithoutCarreraInput = {
    create?: XOR<PreferenciaUsuarioCarreraCreateWithoutCarreraInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput> | PreferenciaUsuarioCarreraCreateWithoutCarreraInput[] | PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput[]
    connectOrCreate?: PreferenciaUsuarioCarreraCreateOrConnectWithoutCarreraInput | PreferenciaUsuarioCarreraCreateOrConnectWithoutCarreraInput[]
    createMany?: PreferenciaUsuarioCarreraCreateManyCarreraInputEnvelope
    connect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
  }

  export type PreferenciaUsuarioCarreraUpdateManyWithoutCarreraNestedInput = {
    create?: XOR<PreferenciaUsuarioCarreraCreateWithoutCarreraInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput> | PreferenciaUsuarioCarreraCreateWithoutCarreraInput[] | PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput[]
    connectOrCreate?: PreferenciaUsuarioCarreraCreateOrConnectWithoutCarreraInput | PreferenciaUsuarioCarreraCreateOrConnectWithoutCarreraInput[]
    upsert?: PreferenciaUsuarioCarreraUpsertWithWhereUniqueWithoutCarreraInput | PreferenciaUsuarioCarreraUpsertWithWhereUniqueWithoutCarreraInput[]
    createMany?: PreferenciaUsuarioCarreraCreateManyCarreraInputEnvelope
    set?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    disconnect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    delete?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    connect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    update?: PreferenciaUsuarioCarreraUpdateWithWhereUniqueWithoutCarreraInput | PreferenciaUsuarioCarreraUpdateWithWhereUniqueWithoutCarreraInput[]
    updateMany?: PreferenciaUsuarioCarreraUpdateManyWithWhereWithoutCarreraInput | PreferenciaUsuarioCarreraUpdateManyWithWhereWithoutCarreraInput[]
    deleteMany?: PreferenciaUsuarioCarreraScalarWhereInput | PreferenciaUsuarioCarreraScalarWhereInput[]
  }

  export type PreferenciaUsuarioCarreraUncheckedUpdateManyWithoutCarreraNestedInput = {
    create?: XOR<PreferenciaUsuarioCarreraCreateWithoutCarreraInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput> | PreferenciaUsuarioCarreraCreateWithoutCarreraInput[] | PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput[]
    connectOrCreate?: PreferenciaUsuarioCarreraCreateOrConnectWithoutCarreraInput | PreferenciaUsuarioCarreraCreateOrConnectWithoutCarreraInput[]
    upsert?: PreferenciaUsuarioCarreraUpsertWithWhereUniqueWithoutCarreraInput | PreferenciaUsuarioCarreraUpsertWithWhereUniqueWithoutCarreraInput[]
    createMany?: PreferenciaUsuarioCarreraCreateManyCarreraInputEnvelope
    set?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    disconnect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    delete?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    connect?: PreferenciaUsuarioCarreraWhereUniqueInput | PreferenciaUsuarioCarreraWhereUniqueInput[]
    update?: PreferenciaUsuarioCarreraUpdateWithWhereUniqueWithoutCarreraInput | PreferenciaUsuarioCarreraUpdateWithWhereUniqueWithoutCarreraInput[]
    updateMany?: PreferenciaUsuarioCarreraUpdateManyWithWhereWithoutCarreraInput | PreferenciaUsuarioCarreraUpdateManyWithWhereWithoutCarreraInput[]
    deleteMany?: PreferenciaUsuarioCarreraScalarWhereInput | PreferenciaUsuarioCarreraScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutPreferenciasInput = {
    create?: XOR<UsuarioCreateWithoutPreferenciasInput, UsuarioUncheckedCreateWithoutPreferenciasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutPreferenciasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type CarreraCreateNestedOneWithoutUsuariosConPreferenciaInput = {
    create?: XOR<CarreraCreateWithoutUsuariosConPreferenciaInput, CarreraUncheckedCreateWithoutUsuariosConPreferenciaInput>
    connectOrCreate?: CarreraCreateOrConnectWithoutUsuariosConPreferenciaInput
    connect?: CarreraWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutPreferenciasNestedInput = {
    create?: XOR<UsuarioCreateWithoutPreferenciasInput, UsuarioUncheckedCreateWithoutPreferenciasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutPreferenciasInput
    upsert?: UsuarioUpsertWithoutPreferenciasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutPreferenciasInput, UsuarioUpdateWithoutPreferenciasInput>, UsuarioUncheckedUpdateWithoutPreferenciasInput>
  }

  export type CarreraUpdateOneRequiredWithoutUsuariosConPreferenciaNestedInput = {
    create?: XOR<CarreraCreateWithoutUsuariosConPreferenciaInput, CarreraUncheckedCreateWithoutUsuariosConPreferenciaInput>
    connectOrCreate?: CarreraCreateOrConnectWithoutUsuariosConPreferenciaInput
    upsert?: CarreraUpsertWithoutUsuariosConPreferenciaInput
    connect?: CarreraWhereUniqueInput
    update?: XOR<XOR<CarreraUpdateToOneWithWhereWithoutUsuariosConPreferenciaInput, CarreraUpdateWithoutUsuariosConPreferenciaInput>, CarreraUncheckedUpdateWithoutUsuariosConPreferenciaInput>
  }

  export type UsuarioCreateNestedOneWithoutDeviceTokensInput = {
    create?: XOR<UsuarioCreateWithoutDeviceTokensInput, UsuarioUncheckedCreateWithoutDeviceTokensInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutDeviceTokensInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutDeviceTokensNestedInput = {
    create?: XOR<UsuarioCreateWithoutDeviceTokensInput, UsuarioUncheckedCreateWithoutDeviceTokensInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutDeviceTokensInput
    upsert?: UsuarioUpsertWithoutDeviceTokensInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutDeviceTokensInput, UsuarioUpdateWithoutDeviceTokensInput>, UsuarioUncheckedUpdateWithoutDeviceTokensInput>
  }

  export type UsuarioCreateNestedOneWithoutUserCodesInput = {
    create?: XOR<UsuarioCreateWithoutUserCodesInput, UsuarioUncheckedCreateWithoutUserCodesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutUserCodesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutUserCodesNestedInput = {
    create?: XOR<UsuarioCreateWithoutUserCodesInput, UsuarioUncheckedCreateWithoutUserCodesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutUserCodesInput
    upsert?: UsuarioUpsertWithoutUserCodesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutUserCodesInput, UsuarioUpdateWithoutUserCodesInput>, UsuarioUncheckedUpdateWithoutUserCodesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DeviceTokenCreateWithoutUsuarioInput = {
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceTokenUncheckedCreateWithoutUsuarioInput = {
    id?: number
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceTokenCreateOrConnectWithoutUsuarioInput = {
    where: DeviceTokenWhereUniqueInput
    create: XOR<DeviceTokenCreateWithoutUsuarioInput, DeviceTokenUncheckedCreateWithoutUsuarioInput>
  }

  export type DeviceTokenCreateManyUsuarioInputEnvelope = {
    data: DeviceTokenCreateManyUsuarioInput | DeviceTokenCreateManyUsuarioInput[]
  }

  export type PreferenciaUsuarioCarreraCreateWithoutUsuarioInput = {
    createdAt?: Date | string
    carrera: CarreraCreateNestedOneWithoutUsuariosConPreferenciaInput
  }

  export type PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput = {
    carreraId: number
    createdAt?: Date | string
  }

  export type PreferenciaUsuarioCarreraCreateOrConnectWithoutUsuarioInput = {
    where: PreferenciaUsuarioCarreraWhereUniqueInput
    create: XOR<PreferenciaUsuarioCarreraCreateWithoutUsuarioInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput>
  }

  export type PreferenciaUsuarioCarreraCreateManyUsuarioInputEnvelope = {
    data: PreferenciaUsuarioCarreraCreateManyUsuarioInput | PreferenciaUsuarioCarreraCreateManyUsuarioInput[]
  }

  export type UserCodeCreateWithoutUserInput = {
    code: string
    status?: string
    expiryTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCodeUncheckedCreateWithoutUserInput = {
    id?: number
    code: string
    status?: string
    expiryTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCodeCreateOrConnectWithoutUserInput = {
    where: UserCodeWhereUniqueInput
    create: XOR<UserCodeCreateWithoutUserInput, UserCodeUncheckedCreateWithoutUserInput>
  }

  export type UserCodeCreateManyUserInputEnvelope = {
    data: UserCodeCreateManyUserInput | UserCodeCreateManyUserInput[]
  }

  export type DeviceTokenUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: DeviceTokenWhereUniqueInput
    update: XOR<DeviceTokenUpdateWithoutUsuarioInput, DeviceTokenUncheckedUpdateWithoutUsuarioInput>
    create: XOR<DeviceTokenCreateWithoutUsuarioInput, DeviceTokenUncheckedCreateWithoutUsuarioInput>
  }

  export type DeviceTokenUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: DeviceTokenWhereUniqueInput
    data: XOR<DeviceTokenUpdateWithoutUsuarioInput, DeviceTokenUncheckedUpdateWithoutUsuarioInput>
  }

  export type DeviceTokenUpdateManyWithWhereWithoutUsuarioInput = {
    where: DeviceTokenScalarWhereInput
    data: XOR<DeviceTokenUpdateManyMutationInput, DeviceTokenUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type DeviceTokenScalarWhereInput = {
    AND?: DeviceTokenScalarWhereInput | DeviceTokenScalarWhereInput[]
    OR?: DeviceTokenScalarWhereInput[]
    NOT?: DeviceTokenScalarWhereInput | DeviceTokenScalarWhereInput[]
    id?: IntFilter<"DeviceToken"> | number
    token?: StringFilter<"DeviceToken"> | string
    usuarioId?: IntFilter<"DeviceToken"> | number
    createdAt?: DateTimeFilter<"DeviceToken"> | Date | string
    updatedAt?: DateTimeFilter<"DeviceToken"> | Date | string
  }

  export type PreferenciaUsuarioCarreraUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: PreferenciaUsuarioCarreraWhereUniqueInput
    update: XOR<PreferenciaUsuarioCarreraUpdateWithoutUsuarioInput, PreferenciaUsuarioCarreraUncheckedUpdateWithoutUsuarioInput>
    create: XOR<PreferenciaUsuarioCarreraCreateWithoutUsuarioInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutUsuarioInput>
  }

  export type PreferenciaUsuarioCarreraUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: PreferenciaUsuarioCarreraWhereUniqueInput
    data: XOR<PreferenciaUsuarioCarreraUpdateWithoutUsuarioInput, PreferenciaUsuarioCarreraUncheckedUpdateWithoutUsuarioInput>
  }

  export type PreferenciaUsuarioCarreraUpdateManyWithWhereWithoutUsuarioInput = {
    where: PreferenciaUsuarioCarreraScalarWhereInput
    data: XOR<PreferenciaUsuarioCarreraUpdateManyMutationInput, PreferenciaUsuarioCarreraUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type PreferenciaUsuarioCarreraScalarWhereInput = {
    AND?: PreferenciaUsuarioCarreraScalarWhereInput | PreferenciaUsuarioCarreraScalarWhereInput[]
    OR?: PreferenciaUsuarioCarreraScalarWhereInput[]
    NOT?: PreferenciaUsuarioCarreraScalarWhereInput | PreferenciaUsuarioCarreraScalarWhereInput[]
    usuarioId?: IntFilter<"PreferenciaUsuarioCarrera"> | number
    carreraId?: IntFilter<"PreferenciaUsuarioCarrera"> | number
    createdAt?: DateTimeFilter<"PreferenciaUsuarioCarrera"> | Date | string
  }

  export type UserCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: UserCodeWhereUniqueInput
    update: XOR<UserCodeUpdateWithoutUserInput, UserCodeUncheckedUpdateWithoutUserInput>
    create: XOR<UserCodeCreateWithoutUserInput, UserCodeUncheckedCreateWithoutUserInput>
  }

  export type UserCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: UserCodeWhereUniqueInput
    data: XOR<UserCodeUpdateWithoutUserInput, UserCodeUncheckedUpdateWithoutUserInput>
  }

  export type UserCodeUpdateManyWithWhereWithoutUserInput = {
    where: UserCodeScalarWhereInput
    data: XOR<UserCodeUpdateManyMutationInput, UserCodeUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCodeScalarWhereInput = {
    AND?: UserCodeScalarWhereInput | UserCodeScalarWhereInput[]
    OR?: UserCodeScalarWhereInput[]
    NOT?: UserCodeScalarWhereInput | UserCodeScalarWhereInput[]
    id?: IntFilter<"UserCode"> | number
    userId?: IntFilter<"UserCode"> | number
    code?: StringFilter<"UserCode"> | string
    status?: StringFilter<"UserCode"> | string
    expiryTime?: DateTimeFilter<"UserCode"> | Date | string
    createdAt?: DateTimeFilter<"UserCode"> | Date | string
    updatedAt?: DateTimeFilter<"UserCode"> | Date | string
  }

  export type PreferenciaUsuarioCarreraCreateWithoutCarreraInput = {
    createdAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutPreferenciasInput
  }

  export type PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput = {
    usuarioId: number
    createdAt?: Date | string
  }

  export type PreferenciaUsuarioCarreraCreateOrConnectWithoutCarreraInput = {
    where: PreferenciaUsuarioCarreraWhereUniqueInput
    create: XOR<PreferenciaUsuarioCarreraCreateWithoutCarreraInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput>
  }

  export type PreferenciaUsuarioCarreraCreateManyCarreraInputEnvelope = {
    data: PreferenciaUsuarioCarreraCreateManyCarreraInput | PreferenciaUsuarioCarreraCreateManyCarreraInput[]
  }

  export type PreferenciaUsuarioCarreraUpsertWithWhereUniqueWithoutCarreraInput = {
    where: PreferenciaUsuarioCarreraWhereUniqueInput
    update: XOR<PreferenciaUsuarioCarreraUpdateWithoutCarreraInput, PreferenciaUsuarioCarreraUncheckedUpdateWithoutCarreraInput>
    create: XOR<PreferenciaUsuarioCarreraCreateWithoutCarreraInput, PreferenciaUsuarioCarreraUncheckedCreateWithoutCarreraInput>
  }

  export type PreferenciaUsuarioCarreraUpdateWithWhereUniqueWithoutCarreraInput = {
    where: PreferenciaUsuarioCarreraWhereUniqueInput
    data: XOR<PreferenciaUsuarioCarreraUpdateWithoutCarreraInput, PreferenciaUsuarioCarreraUncheckedUpdateWithoutCarreraInput>
  }

  export type PreferenciaUsuarioCarreraUpdateManyWithWhereWithoutCarreraInput = {
    where: PreferenciaUsuarioCarreraScalarWhereInput
    data: XOR<PreferenciaUsuarioCarreraUpdateManyMutationInput, PreferenciaUsuarioCarreraUncheckedUpdateManyWithoutCarreraInput>
  }

  export type UsuarioCreateWithoutPreferenciasInput = {
    nombre: string
    apellido: string
    email: string
    password: string
    rol?: string | null
    verificado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deviceTokens?: DeviceTokenCreateNestedManyWithoutUsuarioInput
    userCodes?: UserCodeCreateNestedManyWithoutUserInput
  }

  export type UsuarioUncheckedCreateWithoutPreferenciasInput = {
    id?: number
    nombre: string
    apellido: string
    email: string
    password: string
    rol?: string | null
    verificado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deviceTokens?: DeviceTokenUncheckedCreateNestedManyWithoutUsuarioInput
    userCodes?: UserCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsuarioCreateOrConnectWithoutPreferenciasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutPreferenciasInput, UsuarioUncheckedCreateWithoutPreferenciasInput>
  }

  export type CarreraCreateWithoutUsuariosConPreferenciaInput = {
    apiId: string
    nombre: string
  }

  export type CarreraUncheckedCreateWithoutUsuariosConPreferenciaInput = {
    id?: number
    apiId: string
    nombre: string
  }

  export type CarreraCreateOrConnectWithoutUsuariosConPreferenciaInput = {
    where: CarreraWhereUniqueInput
    create: XOR<CarreraCreateWithoutUsuariosConPreferenciaInput, CarreraUncheckedCreateWithoutUsuariosConPreferenciaInput>
  }

  export type UsuarioUpsertWithoutPreferenciasInput = {
    update: XOR<UsuarioUpdateWithoutPreferenciasInput, UsuarioUncheckedUpdateWithoutPreferenciasInput>
    create: XOR<UsuarioCreateWithoutPreferenciasInput, UsuarioUncheckedCreateWithoutPreferenciasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutPreferenciasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutPreferenciasInput, UsuarioUncheckedUpdateWithoutPreferenciasInput>
  }

  export type UsuarioUpdateWithoutPreferenciasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    verificado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deviceTokens?: DeviceTokenUpdateManyWithoutUsuarioNestedInput
    userCodes?: UserCodeUpdateManyWithoutUserNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutPreferenciasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    verificado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deviceTokens?: DeviceTokenUncheckedUpdateManyWithoutUsuarioNestedInput
    userCodes?: UserCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CarreraUpsertWithoutUsuariosConPreferenciaInput = {
    update: XOR<CarreraUpdateWithoutUsuariosConPreferenciaInput, CarreraUncheckedUpdateWithoutUsuariosConPreferenciaInput>
    create: XOR<CarreraCreateWithoutUsuariosConPreferenciaInput, CarreraUncheckedCreateWithoutUsuariosConPreferenciaInput>
    where?: CarreraWhereInput
  }

  export type CarreraUpdateToOneWithWhereWithoutUsuariosConPreferenciaInput = {
    where?: CarreraWhereInput
    data: XOR<CarreraUpdateWithoutUsuariosConPreferenciaInput, CarreraUncheckedUpdateWithoutUsuariosConPreferenciaInput>
  }

  export type CarreraUpdateWithoutUsuariosConPreferenciaInput = {
    apiId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type CarreraUncheckedUpdateWithoutUsuariosConPreferenciaInput = {
    id?: IntFieldUpdateOperationsInput | number
    apiId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type UsuarioCreateWithoutDeviceTokensInput = {
    nombre: string
    apellido: string
    email: string
    password: string
    rol?: string | null
    verificado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    preferencias?: PreferenciaUsuarioCarreraCreateNestedManyWithoutUsuarioInput
    userCodes?: UserCodeCreateNestedManyWithoutUserInput
  }

  export type UsuarioUncheckedCreateWithoutDeviceTokensInput = {
    id?: number
    nombre: string
    apellido: string
    email: string
    password: string
    rol?: string | null
    verificado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    preferencias?: PreferenciaUsuarioCarreraUncheckedCreateNestedManyWithoutUsuarioInput
    userCodes?: UserCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsuarioCreateOrConnectWithoutDeviceTokensInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutDeviceTokensInput, UsuarioUncheckedCreateWithoutDeviceTokensInput>
  }

  export type UsuarioUpsertWithoutDeviceTokensInput = {
    update: XOR<UsuarioUpdateWithoutDeviceTokensInput, UsuarioUncheckedUpdateWithoutDeviceTokensInput>
    create: XOR<UsuarioCreateWithoutDeviceTokensInput, UsuarioUncheckedCreateWithoutDeviceTokensInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutDeviceTokensInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutDeviceTokensInput, UsuarioUncheckedUpdateWithoutDeviceTokensInput>
  }

  export type UsuarioUpdateWithoutDeviceTokensInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    verificado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferencias?: PreferenciaUsuarioCarreraUpdateManyWithoutUsuarioNestedInput
    userCodes?: UserCodeUpdateManyWithoutUserNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutDeviceTokensInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    verificado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferencias?: PreferenciaUsuarioCarreraUncheckedUpdateManyWithoutUsuarioNestedInput
    userCodes?: UserCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UsuarioCreateWithoutUserCodesInput = {
    nombre: string
    apellido: string
    email: string
    password: string
    rol?: string | null
    verificado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deviceTokens?: DeviceTokenCreateNestedManyWithoutUsuarioInput
    preferencias?: PreferenciaUsuarioCarreraCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutUserCodesInput = {
    id?: number
    nombre: string
    apellido: string
    email: string
    password: string
    rol?: string | null
    verificado?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deviceTokens?: DeviceTokenUncheckedCreateNestedManyWithoutUsuarioInput
    preferencias?: PreferenciaUsuarioCarreraUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutUserCodesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutUserCodesInput, UsuarioUncheckedCreateWithoutUserCodesInput>
  }

  export type UsuarioUpsertWithoutUserCodesInput = {
    update: XOR<UsuarioUpdateWithoutUserCodesInput, UsuarioUncheckedUpdateWithoutUserCodesInput>
    create: XOR<UsuarioCreateWithoutUserCodesInput, UsuarioUncheckedCreateWithoutUserCodesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutUserCodesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutUserCodesInput, UsuarioUncheckedUpdateWithoutUserCodesInput>
  }

  export type UsuarioUpdateWithoutUserCodesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    verificado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deviceTokens?: DeviceTokenUpdateManyWithoutUsuarioNestedInput
    preferencias?: PreferenciaUsuarioCarreraUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutUserCodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: NullableStringFieldUpdateOperationsInput | string | null
    verificado?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deviceTokens?: DeviceTokenUncheckedUpdateManyWithoutUsuarioNestedInput
    preferencias?: PreferenciaUsuarioCarreraUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type DeviceTokenCreateManyUsuarioInput = {
    id?: number
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PreferenciaUsuarioCarreraCreateManyUsuarioInput = {
    carreraId: number
    createdAt?: Date | string
  }

  export type UserCodeCreateManyUserInput = {
    id?: number
    code: string
    status?: string
    expiryTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceTokenUpdateWithoutUsuarioInput = {
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceTokenUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceTokenUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenciaUsuarioCarreraUpdateWithoutUsuarioInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    carrera?: CarreraUpdateOneRequiredWithoutUsuariosConPreferenciaNestedInput
  }

  export type PreferenciaUsuarioCarreraUncheckedUpdateWithoutUsuarioInput = {
    carreraId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenciaUsuarioCarreraUncheckedUpdateManyWithoutUsuarioInput = {
    carreraId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCodeUpdateWithoutUserInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCodeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCodeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenciaUsuarioCarreraCreateManyCarreraInput = {
    usuarioId: number
    createdAt?: Date | string
  }

  export type PreferenciaUsuarioCarreraUpdateWithoutCarreraInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutPreferenciasNestedInput
  }

  export type PreferenciaUsuarioCarreraUncheckedUpdateWithoutCarreraInput = {
    usuarioId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenciaUsuarioCarreraUncheckedUpdateManyWithoutCarreraInput = {
    usuarioId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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