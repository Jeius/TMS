SELECT
  pre.name AS prefix,
  p.first_name,
  p.last_name,
  suf.name AS suffix,
  t.status,
  pan.panelist_id,
  t.id AS thesis_id
FROM
  (
    (
      (
        (
          panelists pan
          LEFT JOIN profiles p ON ((pan.panelist_id = p.id))
        )
        LEFT JOIN theses t ON ((t.id = pan.thesis_id))
      )
      LEFT JOIN prefixes pre ON ((pre.id = p.prefix_id))
    )
    LEFT JOIN suffixes suf ON ((suf.id = p.suffix_id))
  );