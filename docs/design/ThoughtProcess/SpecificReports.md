# Specific Reports

Each Institution has a variety of reports. My original thinking
had users selecting specific versions in the list of "selected
entities" and when no specific versions were checked, it would
to "latest."

Unfortunately, that had the side-effect of having to add an
entity to a group multiple times if we wanted one specific version
in addition to the "latest" version. This led to some lookup
issues and additional re-keying each entity in a group.

Of course, the benefit was that we didn't have to worry about
error-checking on addition to a group. That is, what does the user
want when they add "version 2.0" to a group, then updates the
versions and goes to add it again.

Do they want both, or do they want to replace one?

So, I'm going to stick with the re-keying option for now and
give the user more control over what's in the group.

There needs to be a consolidation process. For example, if a
group has an institution listed twice, once with "v2.1" and
once with "v2.2", we'll simply consolidate those two into one
entity with both versions in `selectedVersions`.