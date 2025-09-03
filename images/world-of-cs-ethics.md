```plantuml
@startuml

skinparam circle {
  BackgroundColor #ADD8E6
  BorderColor #333
  BorderThickness 2
}

circle "Prog Lang\nOp Sys\nTheory" as Innermost {
}

circle "Graphics\nDatabases\nSoft Eng\nSecurity\nSci Comp\nHCI\nAI" as Middle {
}

circle "BIO\nHealth\nMedia\nEntertainment\nTransportation" as Outer {
}

circle "Ethics\nSociology\nPsychology\nAnthropology\nLocal Cultures" as Outermost {
}

Innermost <|-- Middle
Middle <|-- Outer
Outer <|-- Outermost

@enduml
```
