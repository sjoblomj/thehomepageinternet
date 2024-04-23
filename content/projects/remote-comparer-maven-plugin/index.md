# remote-comparer-maven-plugin

[Apache Maven](https://maven.apache.org/) is a popular build tool for Java, Kotlin and other JVM-based applications. The default building directives can be extended and altered by using plugins.

This is a Maven plugin to compare a local file with a remote file. This is useful if your project for instance has a local copy of a schema definition, configuration or any other type of data that should ideally be kept up to date with a remote file.

If the local and remote files are equal, the plugin returns fine; if not, a warning is printed that the files differ. Optionally, the plugin can be configured to give an error so that the build will not continue.

## Example usage
Example of how to compare two local files with remote counterparts. Include in your pom.xml file:
```
<project>
  <!-- ... groupId, artifactId, definitions and dependencies ... -->

  <build>
    <plugins>
      <plugin>
        <groupId>com.github.sjoblomj</groupId>
        <artifactId>remote-comparer-maven-plugin</artifactId>
        <version>1.0.5</version>
        <executions>
          <execution>
            <id>compare schema-definition</id>
            <goals>
              <goal>remote-compare</goal>
            </goals>
            <configuration>
              <localFilePath>src/main/resources/schema-definition.json</localFilePath>
              <remoteFileUri>https://example.com/remote/schema/definition</remoteFileUri>
              <timeoutMs>20000</timeoutMs>
              <failOnFileDifference>true</failOnFileDifference>
              <failOnFilesNotFound>true</failOnFilesNotFound>
            </configuration>
          </execution>
          <execution>
            <id>compare properties</id>
            <goals>
              <goal>remote-compare</goal>
            </goals>
            <configuration>
              <localFilePath>src/main/resources/application.properties</localFilePath>
              <remoteFileUri>https://example.com/remote/application.properties</remoteFileUri>
              <smallWarningMessage>true</smallWarningMessage>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>

  <pluginRepositories>
    <pluginRepository>
      <id>jitpack.io</id>
      <url>https://jitpack.io</url>
    </pluginRepository>
  </pluginRepositories>
</project>
```

As of version 1.0.5, the following parameters are supported:

* `localFilePath` _required_: Path to a local file to be compared.
* `remoteFileUri` _required_: Uri to a remote file to be compared.
* `timeoutMs` _optional_: Timeout in milliseconds for fetching the remote file. A timeout of 0 is interpreted as infinite timeout. Default: `10000`
* `failOnFileDifference` _optional_: If set to true, the build will fail if the files differ (or if errors arise when checking if they are different). If set to false (default), the build will NOT fail but simply produce a warning. Default: `false`
* `failOnFilesNotFound` _optional_: If set to true, the build will fail if the local file can't be found or the remote file can't be downloaded. If set to false (default), the build will NOT fail but simply produce a warning. Default: `false`
* `smallWarningMessage` _optional_: By default, the warning message given if the local and remote files differ is large to attract the users attention. Set this to true to instead print a smaller warning message that only contain the necessary information. Default: `false`

{{github |repo=remote-comparer-maven-plugin}}


{{thumbnails |text=Below is the icon of the project, representing a file on a local drive on the left, and a remote file from the Internet on the right. The Apache Maven feathers form an equality sign between them.}}
{{thumbnail |title=The icon of the project |small=remote-comparer-maven-plugin_small.png |large=remote-comparer-maven-plugin.png}}
