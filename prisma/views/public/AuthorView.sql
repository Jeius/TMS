SELECT
  p.first_name,
  p.last_name,
  t.status,
  a.author_id,
  t.id AS thesis_id
FROM
  (
    (
      authors a
      LEFT JOIN profiles p ON ((a.author_id = p.id))
    )
    LEFT JOIN theses t ON ((t.id = a.thesis_id))
  );