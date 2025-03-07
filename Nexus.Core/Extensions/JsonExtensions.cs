// -----------------------------------------------------------------------
// <copyright file="JsonExtensions.cs" company="Keka Inc">
//     Copyright (c) Keka.com. All rights reserved.
// </copyright>
// -----------------------------------------------------------------------

using System.Text.Json;

namespace Nexus.Core.Extensions;

/// <summary>
/// Represent a Json Extension.
/// </summary>
public static class JsonExtensions
{
    /// <summary>
    /// Converts to json.
    /// </summary>
    /// <typeparam name="T">source type.</typeparam>
    /// <param name="source">The source.</param>
    /// <returns>
    /// The Json string.
    /// </returns>
    public static string ToJson<T>(this T source)
        where T : class
    {
        return source == default(T) ? string.Empty : JsonSerializer.Serialize(source);
    }

    /// <summary>
    /// Froms the json.
    /// </summary>
    /// <typeparam name="T">destination type.</typeparam>
    /// <param name="str">The string.</param>
    /// <returns>
    /// The object.
    /// </returns>
    public static T FromJson<T>(this string str)
    {
        return string.IsNullOrWhiteSpace(str) ? default : JsonSerializer.Deserialize<T>(str);
    }
}