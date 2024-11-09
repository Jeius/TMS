SELECT
  t.id,
  t.title,
  t.abstract,
  t.year_approved AS year,
  f.file_path,
  d.name AS department,
  c.name AS college,
  COALESCE(
    array_agg(
      DISTINCT (
        ((a_profile.first_name) :: text || ' ' :: text) || (a_profile.last_name) :: text
      )
    ),
    ARRAY [] :: text []
  ) AS authors,
  (
    (
      (
        (
          (COALESCE(adv_prefix.name, '' :: character varying)) :: text || (adv_profile.first_name) :: text
        ) || ' ' :: text
      ) || (adv_profile.last_name) :: text
    ) || COALESCE(
      (', ' :: text || (adv_suffix.name) :: text),
      '' :: text
    )
  ) AS adviser,
  COALESCE(
    array_agg(
      DISTINCT (
        (
          (
            (
              (COALESCE(pan_prefix.name, '' :: character varying)) :: text || (pan_profile.first_name) :: text
            ) || ' ' :: text
          ) || (pan_profile.last_name) :: text
        ) || COALESCE(
          (', ' :: text || (pan_suffix.name) :: text),
          '' :: text
        )
      )
    ),
    ARRAY [] :: text []
  ) AS panelists,
  COALESCE(
    array_agg(DISTINCT s_tag.name),
    (ARRAY [] :: text []) :: character varying []
  ) AS specializations
FROM
  (
    (
      (
        (
          (
            (
              (
                (
                  (
                    (
                      (
                        (
                          (
                            (
                              (
                                theses t
                                LEFT JOIN files f ON ((t.final_file_id = f.id))
                              )
                              LEFT JOIN departments d ON ((t.department_id = d.id))
                            )
                            LEFT JOIN colleges c ON ((d.college_id = c.id))
                          )
                          LEFT JOIN authors a ON ((t.id = a.thesis_id))
                        )
                        LEFT JOIN advisers adv ON ((t.id = adv.thesis_id))
                      )
                      LEFT JOIN panelists pan ON ((t.id = pan.thesis_id))
                    )
                    LEFT JOIN profiles a_profile ON ((a.author_id = a_profile.id))
                  )
                  LEFT JOIN profiles adv_profile ON ((adv.adviser_id = adv_profile.id))
                )
                LEFT JOIN profiles pan_profile ON ((pan.panelist_id = pan_profile.id))
              )
              LEFT JOIN prefixes adv_prefix ON ((adv_profile.prefix_id = adv_prefix.id))
            )
            LEFT JOIN suffixes adv_suffix ON ((adv_profile.suffix_id = adv_suffix.id))
          )
          LEFT JOIN prefixes pan_prefix ON ((pan_profile.prefix_id = pan_prefix.id))
        )
        LEFT JOIN suffixes pan_suffix ON ((pan_profile.suffix_id = pan_suffix.id))
      )
      LEFT JOIN specializations s ON ((t.id = s.thesis_id))
    )
    LEFT JOIN specialization_tags s_tag ON ((s.tag_id = s_tag.id))
  )
WHERE
  (t.year_approved IS NOT NULL)
GROUP BY
  t.id,
  t.title,
  t.abstract,
  t.year_approved,
  f.file_path,
  d.name,
  c.name,
  adv_prefix.name,
  adv_profile.first_name,
  adv_profile.last_name,
  adv_suffix.name;