using Microsoft.Data.SqlClient;
using System.Data;

namespace Nexus.Infrastructure.Database
{
    public sealed class DatabaseContext : IDisposable
    {
        private readonly string connectionString;
        private bool disposed;
        private IDbConnection connection;

        /// <summary>
        /// Initializes a new instance of the <see cref="DatabaseContext"/> class.
        /// </summary>
        /// <param name="connectionString">The sql connection string.</param>
        public DatabaseContext(string connectionString)
        {
            this.connectionString = connectionString;
        }

        /// <summary>
        /// Gets the database connection, creating it if it doesn't exist.
        /// </summary>
        public IDbConnection Connection
        {
            get
            {
                this.EnsureConnectionOpen();
                return this.connection;
            }
        }

        /// <summary>
        /// Gets the database transaction.
        /// </summary>
        public IDbTransaction Transaction { get; private set; }

        /// <summary>
        /// Begins the database transaction.
        /// </summary>
        public void BeginTransaction()
        {
            this.Transaction = this.Connection.BeginTransaction();
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void EnsureConnectionOpen()
        {
            // If connection is available and open, return. Else create new connection and set session context.
            if (this.connection is { State: ConnectionState.Open })
            {
                return;
            }

            this.connection = new SqlConnection(this.connectionString);
            this.connection.Open();
        }

        /// <summary>
        /// Protected implementation of Dispose pattern.
        /// </summary>
        /// <param name="disposing">The instance is disposing.</param>
        private void Dispose(bool disposing)
        {
            if (this.disposed)
            {
                return;
            }

            if (disposing)
            {
                // Dispose managed state (managed objects)
                this.connection?.Dispose();
                this.Transaction?.Dispose();
            }

            this.disposed = true;
        }
    }
}
