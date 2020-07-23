import { objectType } from "@nexus/schema"

export const File = objectType({
    name: "File",
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.uuid()
        t.model.type()
        t.model.size()
        t.model.duration()
        t.model.owner()
    }
})
